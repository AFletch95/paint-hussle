const { Router } = require('express');
const router = Router();

const passport = require('passport');

const DEFAULT_PAGE_ENTRIES = 16;

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { user } = req;
    res.status(200).json({ user });
  })
  .put(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const {
      user,
      body: { username, portrait },
    } = req;
    try {
      user.set({ username, portrait });
      res.status(200).json({ user: await user.save() });
    } catch (e) {
      switch (e.name) {
        case 'ValidationError':
          return res.status(200).json({ error: 'invalid' });
        case 'MongoError':
          return res.status(200).json({ error: 'taken' });
        default:
          return res.status(400).end();
      }
    }
  });

router
  .route('/auctions')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { user, body } = req;
    let { page, count } = body;

    const auctionCount = await db.Auction.countDocuments({
      owner: user,
      isActive: true,
    });
    if (auctionCount === 0) {
      return res.status(200).json({
        page: 0,
        totalPages: 0,
        count: 0,
        auctions: [],
      });
    }

    if (typeof count !== 'number' || count <= 0) count = DEFAULT_PAGE_ENTRIES;

    const totalPages = Math.ceil(auctionCount / count);

    if (typeof page !== 'number' || page < 0) page = 0;
    if (page >= totalPages) page = totalPages - 1;

    const auctions = await db.Auction.find({ owner: user, isActive: true })
      .skip(page * count)
      .limit(count);
    res.status(200).json({
      page,
      totalPages,
      count,
      auctions,
    });
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { user } = req;
    try {
      const {
        canvas: canvasId,
        isAnonymous,
        duration,
        price: { starting, buyout },
      } = req.body;

      const canvas = await db.Canvas.findById(canvasId).select(
        'owner visibility',
      );
      if (!canvas) throw 'Bad Request';
      if (!canvas.isOwnedBy(user)) throw 'Unauthorized';
      if (canvas.visibility === 'private') throw 'Bad Request';

      const auction = new db.Auction({
        canvas,
        seller: user,
        isAnonymous,
        duration,
        price: {
          starting,
          buyout,
        },
      });

      const result = await auction.save();
      console.log(result);

      res.status(201).json({});
    } catch (err) {
      console.log(err);
      switch (err) {
        case 'Unauthorized':
          res.status(401).json({});
          break;
        default:
          res.status(400).json({});
      }
    }
  });

router
  .route('/bids')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { user } = req;
    const bids = await db.Bid.find({ bidder: user }).populate({
      path: 'auction',
      match: { isActive: true },
    });
    res.status(200).json({ bids: bids.filter(bid => !!bid.auction._id) });
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { user, body } = req;
    try {
      const { auction: auctionId, isAnonymous, amount } = body;

      const auction = await db.Auction.findById(auctionId).select(
        'seller price duration createdAt',
      );
      //if (user._id.equals(auction.seller)) throw Error();
      if (!auction.isExpired) throw Error();
      // TODO if user doesn't have enough money throw Error
      if (auction.price.current >= amount) throw Error();

      const bid = new db.Bid({
        auction,
        bidder: user,
        isAnonymous,
        amount,
      });
      auction.price.set({ current: amount });

      const result = await Promise.all([bid.save(), auction.save()]);
      console.log(result);

      res.status(201).json({});
    } catch (err) {
      console.log(err);
      res.status(400).json({});
    }
  });

router
  .route('/canvases/:id')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { user, params } = req;
    const { id } = params;
    const canvas = await db.Canvas.findById(id).where({ owner: user });
    if (!canvas) {
      res.status(404).json({});
    } else {
      res.status(200).json({ canvas });
    }
  })
  .put(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { user, params } = req;
    const { id } = params;
    const canvas = await db.Canvas.findById(id).where({ owner: user });
    if (!canvas) {
      return res.status(404).json({});
    }
    const { visibilty, image, title, description } = req.body;
    if (visibility) canvas.visibility = visibility;
    if (image) canvas.image = image;
    if (title) canvas.title = title;
    if (description) canvas.description = description;
    const result = await canvas.save();

    res.status(200).json({
      canvas: result,
    });
  });

router
  .route('/canvases')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { user, body } = req;
    let { page, count } = body;

    const canvasCount = await db.Canvas.countDocuments({ owner: user });
    if (canvasCount === 0) {
      return res.status(200).json({
        page: 0,
        totalPages: 0,
        count: 0,
        canvases: [],
      });
    }

    if (typeof count !== 'number' || count <= 0) count = DEFAULT_PAGE_ENTRIES;

    const totalPages = Math.ceil(canvasCount / count);

    if (typeof page !== 'number' || page < 0) page = 0;
    if (page >= totalPages) page = totalPages - 1;

    const canvases = await db.Canvas.find({ owner: user })
      .skip(page * count)
      .limit(count);

    res.status(200).json({
      page,
      totalPages,
      count,
      canvases,
    });
  });

router
  .route('/logout')
  .post(passport.authenticate('jwt', { session: false }), (req, res) => {
    res
      .clearCookie('authToken')
      .clearCookie('user')
      .status(200)
      .end();
  });

module.exports = router;

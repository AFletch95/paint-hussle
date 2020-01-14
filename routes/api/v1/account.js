const { Router } = require('express');
const router = Router();

const passport = require('passport');

router
  .route('/logout')
  .post(passport.authenticate('jwt', { session: false }), (req, res) => {
    res
      .cookie('authToken', undefined)
      .status(200)
      .end();
  });

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { user } = req;
    res.status(200).json({
      user,
    });
  })
  .put(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { user, body } = req;
    user.set(body);
    const updated = await user.save();
    updated.mask();
    res.status(200).json({
      user: updated,
    });
  });

router
  .route('/auctions')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
      auctions: req.user.auctions || [],
    });
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
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
      if (!canvas.isOwnedBy(req.user)) throw 'Unauthorized';
      if (canvas.visibility === 'private') throw 'Bad Request';

      const auction = new db.Auction({
        canvas,
        seller: req.user,
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
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
      bids: req.user.bids || [],
    });
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    try {
      const { auction: auctionId, isAnonymous, amount } = req.body;

      const auction = await db.Auction.findById(auctionId).select(
        'seller price duration createdAt',
      );
      //if (req.user._id.equals(auction.seller)) throw Error();
      if (!auction.isExpired) throw Error();
      // TODO if user doesn't have enough money throw Error
      if (auction.price.current >= amount) throw Error();

      const bid = new db.Bid({
        auction,
        bidder: req.user,
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
    const { id } = req.params;
    const canvas = await db.Canvas.findById(id).where({ owner: req.user._id });
    if (!canvas) {
      res.status(404).json({});
    } else {
      res.status(200).json({
        canvas,
      });
    }
  })
  .put(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const canvas = await db.Canvas.findById(id).where({ owner: req.user._id });
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
    res.status(200).json({
      canvases: req.user.canvases || [],
    });
  });

module.exports = router;

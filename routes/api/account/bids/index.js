const { Router } = require('express');
const router = Router();

const { getUser } = require('../../../../middleware/orm');

router.get('/', getUser({ select: '_id', populate: 'bids' }), (req, res) => {
  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: { bids: req.user.bids || [] },
  });
});

router.post('/', getUser({ select: '_id' }), async (req, res) => {
  const db = req.app.get('db');
  try {
    const { auction: auctionId, isAnonymous, amount } = req.body;

    const auction = await db.Auction.findById(auctionId).select('seller price duration createdAt');
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

    res.status(201).json({
      status: 201,
      statusText: 'Created',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      statusText: 'Bad Request',
    });
  }
});

module.exports = router;

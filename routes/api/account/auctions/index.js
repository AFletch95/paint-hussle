const { Router } = require('express');
const router = Router();

const { getUser } = require('../../../../middleware/orm');

router.get(
  '/',
  getUser({ select: '_id', populate: { path: 'auctions', select: '+price.starting', populate: 'highestBid' } }),
  (req, res) => {
    res.status(200).json({
      status: 200,
      statusText: 'OK',
      result: { auctions: req.user.auctions || [] },
    });
  },
);

router.post('/', getUser({ select: '_id' }), async (req, res) => {
  const db = req.app.get('db');
  try {
    const {
      canvas: canvasId,
      isAnonymous,
      duration,
      price: { starting, buyout },
    } = req.body;

    const canvas = await db.Canvas.findById(canvasId).select('owner visibility');
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

    res.status(201).json({
      status: 201,
      statusText: 'Created',
    });
  } catch (err) {
    console.log(err);
    switch (err) {
      case 'Unauthorized':
        res.status(401).json({
          status: 401,
          statusText: 'Unauthorized',
        });
        break;
      default:
        res.status(400).json({
          status: 400,
          statusText: 'Bad Request',
        });
    }
  }
});

module.exports = router;

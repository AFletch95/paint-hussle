const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');

  const auctions = db.Auction.find({
    visibility: 'public',
  });

  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: {
      auctions,
    },
  });
});

module.exports = router;

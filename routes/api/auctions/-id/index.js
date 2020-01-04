const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.auction;
  const auction = await db.Auction.findById(id)
    .where('visibility')
    .ne('private');
  if (!auction) {
    return res.status(404).json({
      status: 404,
      statusText: 'Not Found',
    });
  }
  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: { auction },
  });
});

module.exports = router;

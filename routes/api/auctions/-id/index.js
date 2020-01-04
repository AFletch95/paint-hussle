const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.auction;
  const auction = await db.Auction.findById(id)
    .where('visibility')
    .ne('private');
  if (!auction) {
    return res.status(404).json({});
  }
  res.status(200).json({
    result: { auction },
  });
});

module.exports = router;

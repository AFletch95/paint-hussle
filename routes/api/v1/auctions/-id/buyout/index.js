const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  const db = req.app.get('db');
  const {
    user,
    auction: { id },
  } = req;

  const auction = await db.Auction.findById(id)
    .where({ isActive: true })
    .where('visibility')
    .ne('private')
    .populate('canvas');

  if (!auction || !auction.canvas) {
    return res.status(404).json({});
  }

  if (user._id.equals(auction.seller)) {
    return res.status(400).json({});
  }
  //TODO check if user has enough money

  auction.isActive = false;
  // TODO save that the auction was bought out

  auction.canvas.owner = user;
  auction.markModified('canvas');

  const result = await auction.save();
  console.log(result);

  res.status(200).json({});
});

module.exports = router;

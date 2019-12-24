const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.user;
  const user = await db.User.findById(id)
    .select('_id')
    .populate({
      path: 'bids',
      match: {
        isAnonymous: false,
      },
    });
  if (user) {
    res.status(200).json({
      status: 200,
      statusText: 'OK',
      result: { auctions: user.auctions || [] },
    });
  } else {
    res.status(404).json({
      status: 404,
      statusText: 'Not Found',
    });
  }
});

module.exports = router;

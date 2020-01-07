const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.user;
  const user = await db.User.findById(id)
    .select('_id')
    .populate({
      path: 'auctions',
      match: {
        visibility: 'public',
      },
    });
  if (user) {
    res.status(200).json({
      auctions: user.auctions || [],
    });
  } else {
    res.status(404).json({});
  }
});

module.exports = router;

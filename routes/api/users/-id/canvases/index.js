const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.user;
  const user = await db.User.findById(id)
    .select('_id')
    .populate({
      path: 'canvases',
      match: {
        visibility: 'public',
      },
    });
  if (user) {
    res.status(200).json({
      canvases: user.canvases || [],
    });
  } else {
    res.status(404).json({});
  }
});

module.exports = router;

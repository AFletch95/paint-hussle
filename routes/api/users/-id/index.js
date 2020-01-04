const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.user;
  const user = await db.User.findById(id);
  if (!user) {
    return res.status(404).json({});
  }
  res.status(200).json({
    result: { user },
  });
});

module.exports = router;

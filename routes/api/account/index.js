const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const { user } = req;
  user.mask();
  res.status(200).json({
    user,
  });
});

router.put('/', async (req, res) => {
  const { user, body } = req;
  user.set(body);
  const updated = await user.save();
  updated.mask();
  res.status(200).json({
    user: updated,
  });
});

module.exports = router;

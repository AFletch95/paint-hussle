const { Router } = require('express');
const router = Router();

const { verifyToken } = require('../../../middleware/auth');
const { getUser } = require('../../../middleware/orm');

router.use('/login', require('./login'));
router.use('/logout', verifyToken, require('./logout'));

router.use('/canvases', verifyToken, require('./canvases'));
router.use('/auctions', verifyToken, require('./auctions'));
router.use('/bids', verifyToken, require('./bids'));

router.get('/', verifyToken, getUser({ select: '+name +email +phone' }), async (req, res) => {
  const { user } = req;
  user.mask();
  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: { user },
  });
});

router.put('/', verifyToken, getUser({ select: '+name +email +phone' }), async (req, res) => {
  const { user, body } = req;
  user.set(body);
  const updated = await user.save();
  updated.mask();
  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: { user: updated },
  });
});

module.exports = router;

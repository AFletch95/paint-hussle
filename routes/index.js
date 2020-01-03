const { Router } = require('express');
const router = Router();

const { verifyToken } = require('../middleware/auth');
const { getUser } = require('../middleware/orm');

function parseParams(name) {
  return (req, res, next) => {
    req[name] = { id: req.params.id };
    next();
  };
}

router.use('/api/account', verifyToken, getUser({ select: '+name +email +phone' }), require('./api/account'));
router.use('/api/account/auctions', verifyToken, require('./api/account/auctions'));
router.use('/api/account/bids', verifyToken, require('./api/account/bids'));
router.use('/api/account/canvases', verifyToken, require('./api/account/canvases'));
router.use('/api/account/login', require('./api/account/login'));
router.use('/api/account/logout', verifyToken, require('./api/account/logout'));

router.use('/api/auctions', require('./api/auctions'));
router.use(
  '/api/auctions/:id/buyout',
  parseParams('auction'),
  verifyToken,
  getUser({ select: '_id' }),
  require('./api/auctions/-id/buyout'),
);
router.use('/api/auctions/:id', parseParams('auction'), require('./api/auctions/-id'));

router.use('/api/canvases', require('./api/canvases'));
router.use('/api/canvases/:id', parseParams('canvas'), require('./api/canvases/-id'));

router.use('/api/users', require('./api/users'));
router.use('/api/users/:id/auctions', parseParams('user'), require('./api/users/-id/auctions'));
router.use('/api/users/:id/bids', parseParams('user'), require('./api/users/-id/bids'));
router.use('/api/users/:id/canvases', parseParams('user'), require('./api/users/-id/canvases'));
router.use('/api/users/:id', parseParams('user'), require('./api/users/-id'));

router.use('*', require('./404'));

module.exports = router;

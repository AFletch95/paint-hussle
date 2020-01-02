const { Router } = require('express');
const router = Router();

router.use('/account', require('./account'));
router.use('/users', require('./users'));
router.use('/canvases', require('./canvases'));
router.use('/auctions', require('./auctions'));

module.exports = router;

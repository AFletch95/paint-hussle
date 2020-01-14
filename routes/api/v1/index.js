const { Router } = require('express');
const router = Router();

router.use('/account', require('./account.js'));
router.use('/auctions', require('./auctions.js'));
router.use('/auth', require('./auth.js'));
router.use('/canvases', require('./canvases.js'));
router.use('/users', require('./users.js'));

module.exports = router;

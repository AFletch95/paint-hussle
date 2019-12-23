const { Router } = require('express');
const router = Router();

router.use('/account', require('./account'));
router.use('/accounts', require('./accounts'));
router.use('/canvases', require('./canvases'));

module.exports = router;

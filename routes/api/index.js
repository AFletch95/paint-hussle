const { Router } = require('express');
const router = Router();

const { verifyToken } = require('../../middleware/auth');

router.use('/account', require('./account'));
router.use('/products', require('./products'));

module.exports = router;

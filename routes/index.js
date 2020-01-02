const { Router } = require('express');
const router = Router();

router.use('/api', require('./api'));
router.use('/', require('./404Router.js'));

module.exports = router;

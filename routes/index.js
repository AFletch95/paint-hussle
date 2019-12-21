const { Router } = require('express');
const router = Router();

router.use('/api', require('./api'));

router.use('*', (req, res) => {
  res.status(404);
  if (req.method === 'GET' && req.accepts('html')) {
    try {
      return res.sendFile(path.join(__dirname, './client/build/index.html'));
    } catch {}
  }
  if (req.accepts('json')) {
    return res.send({
      status: 404,
      statusText: 'Not found',
    });
  }
  res.type('txt').send('Not found');
});

module.exports = router;

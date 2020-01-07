const path = require('path');

module.exports = (req, res) => {
  res.status(404);
  if (req.method === 'GET' && req.accepts('html')) {
    console.log('HTML 404');
    try {
      return res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    } catch (err) {
      console.log(err);
    }
  }
  if (req.accepts('json')) {
    console.log('JSON 404');
    return res.json({});
  }
  console.log('TXT 404');
  res.type('txt').send('Not found');
};

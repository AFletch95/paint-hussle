const path = require('path');

module.exports = (req, res) => {
  if (req.method === 'GET' && req.accepts('html')) {
    console.log('HTML 404');
    try {
      return res.status(200).sendFile(path.join(__dirname, '../../client/build/index.html'));
    } catch (err) {
      console.log(err);
    }
  }
  res.status(404);
  if (req.accepts('json')) {
    console.log('JSON 404');
    return res.send({
      status: 404,
      statusText: 'Not found',
    });
  }
  console.log('TXT 404');
  res.type('txt').send('Not found');
};

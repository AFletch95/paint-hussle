const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    const { cookies } = req;
    if (cookies && cookies.authToken) {
      try {
        req.authToken = await jwt.verify(cookies.authToken, process.env.PRIVATE_AUTH_KEY);
        return next();
      } catch (err) {
        console.log(err);
        res.clearCookie('authToken');
      }
    }
    res.status(401).json({
      status: 401,
      statusText: 'Unauthorized',
    });
  },
};

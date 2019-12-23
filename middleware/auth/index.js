const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    const { cookies } = req;
    try {
      if (!cookies || !cookies.authToken) throw Error();
      req.authToken = await jwt.verify(cookies.authToken, process.env.PRIVATE_AUTH_KEY);
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        status: 401,
        statusText: 'Unauthorized',
      });
    }
  },
};

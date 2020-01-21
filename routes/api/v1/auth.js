const { Router } = require('express');
const router = Router();

const passport = require('passport');

const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
};

router
  .route('/google')
  .post(
    passport.authenticate('google-token', { session: false }),
    async (req, res) => {
      const { user } = req;
      if (!user) return res.status(401).json({});
      res.cookie('authToken', user.createAuthToken(), cookieConfig);
      res.status(200).json({ user });
    },
  );

module.exports = router;

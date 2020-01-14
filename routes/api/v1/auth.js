const { Router } = require('express');
const router = Router();

const passport = require('passport');

router.route('/google').post(passport.authenticate('google-token', { session: false }), (req, res) => {
  const { user } = req;
  if (!user) return res.status(401).json({});

  const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  };
  res.cookie('authToken', user.createAuthToken(), cookieConfig);
  res.status(200).json({
    user: {
      username: user.username,
    },
  });
});

module.exports = router;

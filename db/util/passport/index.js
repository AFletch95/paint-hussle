const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const { Strategy: JwtStrategy } = require('passport-jwt');

module.exports = {
  init({ User }) {
    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        },
        (accessToken, refreshToken, profile, done) => {
          User.upsertGoogleUser(accessToken, refreshToken, profile)
            .then(user => {
              console.log('user', user);
              done(null, user);
            })
            .catch(err => {
              console.log('error', err);
              done(err);
            });
        },
      ),
    );
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: req => {
            const { cookies } = req;
            if (!cookies || !cookies.authToken) return null;
            return cookies.authToken;
          },
          secretOrKey: process.env.PRIVATE_AUTH_KEY,
          algorithms: ['HS256'],
          ignoreExpiration: process.env.NODE_ENV !== 'production',
          passReqToCallback: true,
        },
        (req, payload, done) => {
          console.log(req);
          User.findById(payload.id)
            .then(user => {
              if (!user) return done(null, false);
              done(null, user);
            })
            .catch(err => done(err));
        },
      ),
    );
  },
};

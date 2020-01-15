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
              console.log('Upsert Google User:', user);
              done(null, user);
            })
            .catch(err => {
              console.log('Upsert Google User Error:', err);
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
          let query = User.findById(payload.id);
          const url = req.originalUrl.split('/').slice(1);
          switch (url[0]) {
            case 'api':
              switch (url[1]) {
                case 'v1':
                  switch (url[2]) {
                    case 'account':
                      switch (url[3]) {
                        case 'auctions':
                          if (req.method === 'GET')
                            query = query.select('_id').populate({
                              path: 'auctions',
                              select: '+price.starting',
                              populate: ['highestBid', 'canvas'],
                            });
                          break;
                        case 'bids':
                          if (req.method === 'GET') query = query.select('_id').populate('bids');
                          break;
                        case 'canvases':
                          if (!url[4] && req.method === 'GET') query = query.select('_id').populate('canvases');
                          break;
                        default:
                          console.log(3, url);
                      }
                      break;
                    default:
                      console.log(2, url);
                  }
                  break;
                default:
                  console.log(1, url);
              }
              break;
            default:
              console.log(0, url);
          }
          query
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

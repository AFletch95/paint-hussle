const { Router } = require('express');
const router = Router();

const validator = require('validator');

function getQuery(identifier) {
  return validator.isEmail(identifier) ? { account: { email: identifier } } : { username: identifier };
}

router.post('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const { identifier, password } = req.body;
    console.log(req.body)
    if (!identifier || !password) throw 'Unauthorized';

    const user = await db.User.findOne(getQuery(identifier)).select('password');
    console.log(user)
    if (!user) throw 'Unauthorized';
    const isMatch = await user.checkPassword(password);
    console.log(isMatch)
    if (!isMatch) throw 'Unauthorized';

    const cookieConfig = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    };
    res.cookie('authToken', user.createAuthToken(), cookieConfig);
    console.log(cookieConfig)
    res.status(200).json({
      status: 200,
      statusText: 'OK',
    });
  } catch (err) {
    console.log(err)
    res.status(401).json({
      status: 401,
      statusText: 'Unauthorized',
    });
  }
});

module.exports = router;

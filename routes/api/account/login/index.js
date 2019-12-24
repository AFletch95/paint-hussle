const { Router } = require('express');
const router = Router();

const validator = require('validator');
const jwt = require('jsonwebtoken');

function getQuery(identifier) {
  return validator.isEmail(identifier) ? { account: { email: identifier } } : { username: identifier };
}

router.post('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) throw 'Unauthorized';

    const user = await db.User.findOne(getQuery(identifier)).select('password');
    if (!user) throw 'Unauthorized';
    const isMatch = await user.checkPassword(password);
    if (!isMatch) throw 'Unauthorized';

    const payload = {
      id: user._id,
    };
    const signConfig = {
      algorithm: 'HS256',
      expiresIn: '48h',
    };
    const authToken = jwt.sign(payload, process.env.PRIVATE_AUTH_KEY, signConfig);

    const cookieConfig = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    };
    res.cookie('authToken', authToken, cookieConfig);

    res.status(200).json({
      status: 200,
      statusText: 'OK',
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      statusText: 'Unauthorized',
    });
  }
});

module.exports = router;

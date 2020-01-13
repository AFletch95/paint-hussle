const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const { username, password, name, dateOfBirth, phone, bio, image } = req.body;
    let { email } = req.body;
    if (typeof email === 'string') email = { address: email };
    const newUser = new db.User({
      username,
      password,
      name,
      email,
      dateOfBirth,
      phone,
      bio,
      image,
    });
    const result = await newUser.save();
    console.log(result);

    res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(400).json({});
  }
});

module.exports = router;

const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const { username, password, name, dateOfBirth, phone, bio, image } = req.body;
    let { email } = req.body;
    if (typeof email === 'string') email = { address: email };
    console.log(dateOfBirth, dateOfBirth instanceof Date);
    const newUser = new db.User({
      username,
      password,
      name,
      email,
      dateOfBirth: new Date(dateOfBirth),
      phone,
      bio,
      image,
    });
    const result = await newUser.save();
    console.log(result);

    res.status(201).json({
      status: 201,
      statusText: 'Created',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      statusText: 'Bad Request',
    });
  }
});

module.exports = router;

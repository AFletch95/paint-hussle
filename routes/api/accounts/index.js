const { Router } = require('express');
const router = Router();

router.use(
  '/:id',
  (req, res, next) => {
    req.user = { id: req.params.id };
    next();
  },
  require('./-id'),
);

router.post('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    console.log(req.body);
    const newUser = new db.User(req.body);
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

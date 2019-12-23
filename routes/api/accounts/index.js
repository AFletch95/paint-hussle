const { Router } = require('express');
const router = Router();

router.get('/:id', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const user = await db.User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: 404,
      statusText: 'Not Found',
    });
  }
  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: { user },
  });
});

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

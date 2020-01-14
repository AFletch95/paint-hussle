const { Router } = require('express');
const router = Router();

const passport = require('passport');

router.route('/:id').get(async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const canvas = await db.Canvas.findById(id)
    .where('visibility')
    .ne('private');
  if (!canvas) {
    return res.status(404).json({});
  }
  res.status(200).json({
    canvas,
  });
});

router
  .route('/')
  .get(async (req, res) => {
    const db = req.app.get('db');

    const canvases = db.Canvas.find({ visibility: 'public' });

    res.status(200).json({
      canvases,
    });
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { image, title, description } = req.body;
    const canvas = new db.Canvas({
      owner: req.user,
      visibility: 'public',
      image,
      title,
      description,
    });
    const result = await canvas.save();

    res.status(200).json({
      canvas: result,
    });
  });

module.exports = router;

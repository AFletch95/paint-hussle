const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.canvas;
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

module.exports = router;

const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');

  const canvases = db.Canvas.find({ visibility: 'public' });

  res.status(200).json({
    result: {
      canvases,
    },
  });
});

module.exports = router;

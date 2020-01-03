const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { filters } = req.body;

  const canvases = db.Canvas.find({ visibility: 'public' });

  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: {
      canvases,
    },
  });
});

module.exports = router;

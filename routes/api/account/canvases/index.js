const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: { canvases: req.user.canvases || [] },
  });
});

module.exports = router;

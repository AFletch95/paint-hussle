const { Router } = require('express');
const router = Router();

const { getUser } = require('../../../../middleware/orm');

router.get('/', getUser({ select: '_id', populate: 'canvases' }), async (req, res) => {
  res.status(200).json({
    canvases: req.user.canvases || [],
  });
});

module.exports = router;

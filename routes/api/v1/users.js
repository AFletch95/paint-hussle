const { Router } = require('express');
const router = Router();

router.route('/:id/auctions').get(async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const user = await db.User.findById(id)
    .select('_id')
    .populate({
      path: 'auctions',
      match: {
        visibility: 'public',
      },
    });
  if (user) {
    res.status(200).json({
      auctions: user.auctions || [],
    });
  } else {
    res.status(404).json({});
  }
});

router.route('/:id/bids').get(async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const user = await db.User.findById(id)
    .select('_id')
    .populate({
      path: 'bids',
      match: {
        isAnonymous: false,
      },
    });
  if (user) {
    res.status(200).json({
      auctions: user.auctions || [],
    });
  } else {
    res.status(404).json({});
  }
});

router.route('/:id/canvases').get(async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const user = await db.User.findById(id)
    .select('_id')
    .populate({
      path: 'canvases',
      match: {
        visibility: 'public',
      },
    });
  if (user) {
    res.status(200).json({
      canvases: user.canvases || [],
    });
  } else {
    res.status(404).json({});
  }
});

router.route('/:id').get(async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const user = await db.User.findById(id);
  if (!user) {
    return res.status(404).json({});
  }
  res.status(200).json({
    user,
  });
});

module.exports = router;

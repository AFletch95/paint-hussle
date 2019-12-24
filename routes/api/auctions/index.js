const { Router } = require('express');
const router = Router();

router.use(
  '/:id',
  (req, res, next) => {
    req.auction = { id: req.params.id };
    next();
  },
  require('./-id'),
);

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { filters } = req.body;

  const auctions = db.Auction.find({
    visibility: 'public',
  });

  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: {
      auctions,
    },
  });
});

module.exports = router;

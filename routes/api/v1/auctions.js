const { Router } = require('express');
const router = Router();

const passport = require('passport');

const DEFAULT_PAGE_ENTRIES = 10;

router
  .route('/:id/buyout')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const auction = await db.Auction.findById(id)
      .where('visibility')
      .ne('private');
    if (!auction) {
      return res.status(404).json({});
    }
    res.status(200).json({
      auction,
    });
  });

router.route('/:id').get(async (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const auction = await db.Auction.findById(id)
    .where('visibility')
    .ne('private');
  if (!auction) {
    return res.status(404).json({});
  }
  res.status(200).json({
    auction,
  });
});

router.route('/').get(async (req, res) => {
  const db = req.app.get('db');

  let { page, count } = req.body;

  const totalAuctions = await db.Auction.countDocuments({
    isActive: true,
    visibility: 'public',
  });
  if (totalAuctions === 0) {
    return res.status(200).json({
      page: -1,
      totalPages: 0,
      count: 0,
      auctions: [],
    });
  }
  if (typeof count !== 'number' || count <= 0) count = DEFAULT_PAGE_ENTRIES;

  const totalPages = Math.ceil(totalAuctions / count);

  if (typeof page !== 'number' || page < 0) page = 0;
  if (page >= totalPages) page = totalPages - 1;

  const auctions = await db.Auction.find({
    isActive: true,
    visibility: 'public',
  })
    .skip(page * count)
    .limit(count)
    .populate('canvas seller highestBid');

  res.status(200).json({
    page,
    totalPages,
    count,
    auctions,
  });
});

module.exports = router;

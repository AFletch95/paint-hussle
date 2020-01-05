const { Router } = require('express');
const router = Router();

const DEFAULT_PAGE_ENTRIES = 10;

router.get('/', async (req, res) => {
  const db = req.app.get('db');

  let { page, pageEntries } = req.body;
  if (typeof page !== 'number') page = 0;
  if (typeof pageEntries !== 'number') pageEntries = DEFAULT_PAGE_ENTRIES;

  const auctions = await db.Auction.find({ visibility: 'public' })
    .skip(page * pageEntries)
    .limit(pageEntries)
    .populate('canvas seller highestBid');

  res.status(200).json({
    result: {
      page,
      pageCount,
      auctions,
    },
  });
});

module.exports = router;

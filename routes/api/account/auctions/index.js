const { Router } = require('express');
const router = Router();

const { getUser } = require('../../../../middleware/orm');

router.get('/', getUser({ select: '_id', populate: 'auctions' }), async (req, res) => {
  res.status(200).json({
    status: 200,
    statusText: 'OK',
    result: { auctions: req.user.auctions || [] },
  });
});

module.exports = router;

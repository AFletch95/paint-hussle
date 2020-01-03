const DEFAULT_EXPIRATION_CHECK_PERIOD = 10 * 1000;

let intervalHandle;
module.exports = {
  init: ({ Auction, Canvas }, period = DEFAULT_EXPIRATION_CHECK_PERIOD) => {
    if (intervalHandle) clearInterval(intervalHandle);
    intervalHandle = setInterval(async () => {
      const auctions = await Auction.find({ isActive: true })
        .where('expiresAt')
        .lt(new Date())
        .populate('highestBid');

      if (auctions.length === 0) return console.log('No expired auctions');

      const updates = auctions.map(async auction => {
        auction.isActive = false;
        if (auction.highestBid) {
          const canvas = await Canvas.findById(auction.canvas);
          canvas.owner = auction.highestBid.bidder;
          // TODO transfer credits from bidder to seller
          const savedCanvas = await canvas.save();
          console.log(savedCanvas);
        }
        return await auction.save();
      });

      const savedAuctions = await Promise.all(updates);

      console.log('Updated expired auctions', savedAuctions);
    }, period);
  },
};

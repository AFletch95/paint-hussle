module.exports = {
  init: models => {
    require('./auctionExpiration').init(models);
  },
};

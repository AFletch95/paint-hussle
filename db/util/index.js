module.exports = {
  init: models => {
    require('./auctionExpiration').init(models);
    require('./passport').init(models);
  },
};

const mongoose = require('mongoose');

module.exports = {
  User: mongoose.model('User', require('./User')),
  Canvas: mongoose.model('Canvas', require('./Canvas')),
  Auction: mongoose.model('Auction', require('./Auction')),
  Bid: mongoose.model('Bid', require('./Bid')),
};

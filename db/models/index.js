const mongoose = require('mongoose');

module.exports = {
  User: mongoose.model('User', require('./User')),
  Product: mongoose.model('Canvas', require('./Canvas')),
  Seller: mongoose.model('Auction', require('./Auction')),
};

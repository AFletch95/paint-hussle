const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/urbanorganics';
const MONGODB_CONFIG = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(MONGODB_URI, MONGODB_CONFIG);

const models = require('./models');

require('./systems').init(models);

module.exports = models;

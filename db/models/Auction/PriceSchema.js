const { Schema } = require('mongoose');

const PriceSchema = new Schema(
  {
    starting: {
      type: Number,
      required: true,
      select: false,
      min: 0,
    },
    current: {
      type: Number,
      default: function() {
        return this.starting;
      },
      validate: {
        validator: function(v) {
          return v >= this.starting;
        },
        message: 'current must be greater than starting',
      },
    },
    buyout: {
      type: Number,
      validate: {
        validator: function(v) {
          return v >= this.starting;
        },
        message: 'buyout must be greater than starting',
      },
    },
  },
  {
    _id: false,
  },
);

module.exports = PriceSchema;

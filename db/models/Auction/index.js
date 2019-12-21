const { Schema } = require('mongoose');

const AuctionSchema = new Schema({
  canvas: {
    type: Schema.Types.ObjectId,
    ref: 'canvas',
  },
  price: {
    starting: {
      type: Number,
    },
    current: {
      type: Number,
    },
  },
  anonymous: {
    type: Boolean,
  },

  duration: {
    type: Number,
  },
});

AuctionSchema.virtual('seller', {
  ref: 'Canvas',
  localField: 'canvas',
  foreignField: '_id',
  select: 'owner',
});

module.exports = AuctionSchema;

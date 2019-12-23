const { Schema, model } = require('mongoose');

const AuctionSchema = new Schema(
  {
    canvas: {
      type: Schema.Types.ObjectId,
      ref: 'Canvas',
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
      default: false,
    },
    duration: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

module.exports = AuctionSchema;

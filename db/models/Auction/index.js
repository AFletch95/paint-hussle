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

AuctionSchema.pre('find', async function() {
  this.populate('canvas').populate('canvas.owner');
});

AuctionSchema.pre('findOne', async function() {
  this.populate({
    path: 'canvas',
    populate: {
      path: 'owner',
    },
  });
});

module.exports = AuctionSchema;

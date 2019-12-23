const { Schema, model } = require('mongoose');

const AuctionSchema = new Schema(
  {
    canvas: {
      type: Schema.Types.ObjectId,
      ref: 'Canvas',
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
  },
  {
    toJSON: { virtuals: true },
  },
);

AuctionSchema.virtual('seller', {
  ref: 'Canvas',
  localField: 'canvas',
  foreignField: '_id',
  justOne: true,
  select: 'owner',
});

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

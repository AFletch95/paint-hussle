const { Schema, model } = require('mongoose');

const MIN_DURATION = 1000 * 60 * 5;

const PriceSchema = require('./PriceSchema.js');

const AuctionSchema = new Schema(
  {
    canvas: {
      type: Schema.Types.ObjectId,
      ref: 'Canvas',
      required: true,
      unique: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
      select: false,
    },
    visibility: {
      type: String,
      default: 'public',
      select: false,
      lowercase: true,
      trim: true,
      enum: ['public', 'unlisted'],
    },
    price: {
      type: PriceSchema,
      required: true,
      set: function(v) {
        return this.price ? this.price.set(v) : (this.price = v);
      },
    },
    duration: {
      type: Number,
      default: MIN_DURATION,
      min: MIN_DURATION,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

AuctionSchema.virtual('bids', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'auction',
  options: {
    sort: { amount: 1 },
    limit: 200,
  },
});

AuctionSchema.virtual('highestBid', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'auction',
  justOne: true,
  options: {
    sort: { amount: 1 },
  },
});

AuctionSchema.virtual('canBuyOut').get(function() {
  return this.price && this.price.buyout ? true : false;
});
AuctionSchema.virtual('isExpired').get(function() {
  return new Date() - this.createdAt > this.duration;
});

module.exports = AuctionSchema;

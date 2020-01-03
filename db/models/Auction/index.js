const { Schema, model } = require('mongoose');

const MIN_DURATION = 5 * 60 * 1000;

const PriceSchema = require('./PriceSchema.js');

const AuctionSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: function() {
        return new Date(this.createdAt.getTime() + this.duration);
      },
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
  return Date.now() > this.expiresAt.getTime();
});

AuctionSchema.methods.anonymize = function() {
  if (this.isAnonymous) delete this.seller;
};

module.exports = model('Auction', AuctionSchema);

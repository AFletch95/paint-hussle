const { Schema, model } = require('mongoose');

const jwt = require('jsonwebtoken');
const validator = require('validator');

const AuthSchema = require('./AuthSchema.js');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      index: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      select: false,
      trim: true,
      validate: {
        validator: v => validator.isEmail(v),
        message: props => `${props.value} is not a valid email`,
      },
    },
    auth: {
      type: AuthSchema,
      default: {},
      select: false,
    },
    portrait: {
      type: Schema.Types.ObjectId,
      ref: 'Canvas',
    },
    createdAt: {
      type: Date,
      select: false,
    },
    updatedAt: {
      type: Date,
      select: false,
    },
  },
  {
    id: false,
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

UserSchema.virtual('canvases', {
  ref: 'Canvas',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.virtual('works', {
  ref: 'Canvas',
  localField: '_id',
  foreignField: 'artist',
});

UserSchema.virtual('auctions', {
  ref: 'Auction',
  localField: '_id',
  foreignField: 'seller',
});

UserSchema.statics.upsertGoogleUser = async function(accessToken, refreshToken, profile) {
  const User = model('User');
  const user = await User.findOne({ 'auth.google.id': profile.id });
  if (!user) {
    const newUser = new User({
      email: profile.emails[0].value,
      auth: {
        google: {
          id: profile.id,
          token: accessToken,
        },
      },
    });
    return await newUser.save();
  }
  return user;
};

UserSchema.methods.createAuthToken = function() {
  const payload = {
    id: this._id,
  };
  const signConfig = {
    algorithm: 'HS256',
    expiresIn: '48h',
  };
  return jwt.sign(payload, process.env.PRIVATE_AUTH_KEY, signConfig);
};

module.exports = model('User', UserSchema);

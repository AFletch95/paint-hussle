const { Schema, model } = require('mongoose');

const jwt = require('jsonwebtoken');
const validator = require('validator');

const AuthSchema = require('./AuthSchema.js');

const UserSchema = new Schema(
  {
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
    username: {
      type: String,
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
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.auth;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  },
);

UserSchema.virtual('auctions', {
  ref: 'Auction',
  localField: '_id',
  foreignField: 'seller',
});

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

UserSchema.statics.upsertGoogleUser = async function(
  accessToken,
  refreshToken,
  profile,
) {
  const User = model('User');
  const user = await User.findOne({ 'auth.google.id': profile.id });
  if (!user) {
    return await new User({
      email: profile.emails[0].value,
      auth: {
        google: {
          id: profile.id,
          token: accessToken,
        },
      },
    }).save();
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

UserSchema.pre('save', async function() {
  if (this.isModified('username')) {
    let proxy = await model('UserProxy').findOne({ user: this });
    if (!proxy)
      proxy = new model('UserProxy')({ user: this, username: this.username });
    else proxy.username = this.username;
    await proxy.save();
  }
});

module.exports = model('User', UserSchema);

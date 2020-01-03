const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const strongPassword = new RegExp(/^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%&+=|^$*-]).{8,}/g);

const MIN_AGE = 13 * 365.2422 * 24 * 60 * 60 * 1000;

const NameSchema = require('./NameSchema.js');
const EmailSchema = require('./EmailSchema.js');
const PhoneSchema = require('./PhoneSchema.js');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: function(v) {
          if (!this.isModified('password')) return true;
          return strongPassword.test(v);
        },
        message: 'not a strong password',
      },
    },
    name: {
      type: NameSchema,
      required: true,
      select: false,
      set: function(v) {
        return this.name ? this.name.set(v) : (this.name = v);
      },
    },
    email: {
      type: EmailSchema,
      required: true,
      select: false,
      set: function(v) {
        return this.email ? this.email.set(v) : (this.email = v);
      },
    },
    phone: {
      type: PhoneSchema,
      select: false,
      set: function(v) {
        return this.phone ? this.phone.set(v) : (this.phone = v);
      },
    },
    dateOfBirth: {
      type: Date,
      required: true,
      select: false,
      validate: {
        validator: function(v) {
          return v.getTime() <= Date.now() - MIN_AGE;
        },
        message: 'not old enough based on date of birth',
      },
    },
    bio: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
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

UserSchema.methods.checkPassword = function(plaintext) {
  return bcrypt.compare(plaintext, this.password);
};

UserSchema.methods.mask = function() {
  if (this.email) this.email.mask();
  if (this.phone) this.phone.mask();
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

UserSchema.pre('find', async function() {});

UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

module.exports = model('User', UserSchema);

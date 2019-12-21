const { Schema, model } = require('mongoose');

const validator = require('validator');

const strongPassword = new RegExp(/^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%&+=|^$*-]).{8,}/g);

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: v => validator.isEmail(v),
      message: props => `${props.value} is not a valid email`,
    },
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        if (!this.isModified('password')) return true;
        return strongPassword.test(v);
      },
      message: 'not a strong password',
    },
  },
  name: {
    first: {
      type: String,
      required: true,
      trim: true,
    },
    last: {
      type: String,
      required: true,
      trim: true,
    },
  },
  phone: {
    type: String,
    validate: {
      validator: v => validator.isMobilePhone(v),
      message: props => `${props.value} is not a valid phone number`,
    },
    trim: true,
  },
});

UserSchema.virtual('emailMasked').get(function() {
  const match = /(..)(.+)(@.+\..+)/.exec(email);
  return match[1] + '*'.repeat(match[2].length) + match[3];
});

UserSchema.virtual('fullName').get(function() {
  return `${this.name.first} ${this.name.last}`;
});

UserSchema.virtual('canvases', {
  ref: 'Canvas',
  localField: '_id',
  foreignField: 'owner',
  match: { visibility: 'public' },
});

UserSchema.methods.checkPassword = function(plaintext) {
  return bcrypt.compare(plaintext, this.password);
};

UserSchema.pre('validate', async function() {});

UserSchema.post('validate', async function() {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

module.exports = UserSchema;

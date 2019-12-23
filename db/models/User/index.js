const { Schema } = require('mongoose');

const bcrypt = require('bcrypt');

const strongPassword = new RegExp(/^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%&+=|^$*-]).{8,}/g);

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
        if (this.name) return this.name.set(v);
        return (this.name = v);
      },
    },
    email: {
      type: EmailSchema,
      required: true,
      select: false,
      set: function(v) {
        if (this.email) return this.email.set(v);
        return (this.email = v);
      },
    },
    phone: {
      type: PhoneSchema,
      select: false,
      set: function(v) {
        if (this.phone) return this.phone.set(v);
        return (this.phone = v);
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
    timestamps: true,
  },
);

UserSchema.virtual('canvases', {
  ref: 'Canvas',
  localField: 'owner',
  foreignField: '_id',
});

UserSchema.methods.checkPassword = function(plaintext) {
  return bcrypt.compare(plaintext, this.password);
};

UserSchema.methods.mask = function() {
  if (this.email) this.email.mask();
  if (this.phone) this.email.mask();
};

UserSchema.pre('validate', async function() {});

UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

module.exports = UserSchema;

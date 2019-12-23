const { Schema } = require('mongoose');

const validator = require('validator');

const EmailSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: v => validator.isEmail(v),
        message: props => `${props.value} is not a valid email`,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    visibility: {
      type: String,
      default: 'private',
      select: false,
      lowercase: true,
      trim: true,
      enum: ['public', 'private'],
    },
  },
  { _id: false },
);

EmailSchema.methods.mask = function() {
  const [, start, , end] = /(.)(.*)(.@.+\..+)/.exec(this.address);
  this.address = `${start}*****${end}`;
};

module.exports = EmailSchema;

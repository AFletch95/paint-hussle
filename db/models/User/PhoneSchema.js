const { Schema } = require('mongoose');

const validator = require('validator');

const PhoneSchema = new Schema(
  {
    number: {
      type: String,
      trim: true,
      validate: {
        validator: v => validator.isMobilePhone(v),
        message: props => `${props.value} is not a valid phone number`,
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

PhoneSchema.methods.mask = function() {};

module.exports = PhoneSchema;

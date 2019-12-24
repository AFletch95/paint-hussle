const { Schema } = require('mongoose');

const NameSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    last: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  { _id: false },
);

NameSchema.virtual('full').get(function() {
  return `${this.first} ${this.last}`;
});

module.exports = NameSchema;

const { Schema } = require('mongoose');

const CanvasSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    visibility: {
      type: String,
      default: 'private',
      lowercase: true,
      trim: true,
      enum: ['public', 'private'],
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      max: 256,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      max: 1024,
    },
  },
  {
    collection: 'canvases',
    timestamps: true,
  },
);

CanvasSchema.methods.isOwnedBy = function(user) {
  if (user == null) return false;
  switch (typeof user) {
    case 'string':
      return user === this.owner;
    case 'object':
      if (user._id) return user._id === this.owner;
    default:
      return false;
  }
};

module.exports = CanvasSchema;

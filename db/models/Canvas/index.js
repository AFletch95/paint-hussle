const { Schema } = require('mongoose');

const CanvasSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    visibility: {
      type: String,
      default: 'private',
      lowercase: true,
      trim: true,
      enum: ['public', 'unlisted', 'private'],
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
  const ownerId = this.owner._id ? this.owner._id : this.owner;
  switch (typeof user) {
    case 'string':
      return user === ownerId.toString();
    case 'object':
      const userId = user._id ? user._id : user;
      return ownerId.equals(userId);
    default:
      return false;
  }
};

module.exports = CanvasSchema;

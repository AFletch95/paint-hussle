const { Schema, model } = require('mongoose');

const CanvasSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
    id: false,
    collection: 'canvases',
    timestamps: true,
  },
);

CanvasSchema.methods.isOwnedBy = function(user) {
  if (user == null) return false;
  const owner = this.owner._id ? this.owner._id : this.owner;
  switch (typeof user) {
    case 'string':
      return user === ownerId.toString();
    case 'object':
      if (user instanceof Schema.Types.ObjectId) return owner.equals(userId);
      else return ownerId.equals(user._id);
    default:
      return false;
  }
};

module.exports = model('Canvas', CanvasSchema);

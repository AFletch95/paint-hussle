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
      default: function() {
        return this.owner;
      },
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
      default:
        '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"><rect width="1" height="1" x="0" y="0" fill="#fff"></rect><g transform="translate(0, 0)"></g></svg>',
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: '',
      trim: true,
      max: 256,
    },
    description: {
      type: String,
      default: '',
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
      return user === owner.toString();
    case 'object':
      if (user instanceof Schema.Types.ObjectId) return owner.equals(userId);
      else return owner.equals(user._id);
    default:
      return false;
  }
};

module.exports = model('Canvas', CanvasSchema);

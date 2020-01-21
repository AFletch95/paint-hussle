const { Schema, model } = require('mongoose');

const UserProxySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    select: false,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 16,
  },
});

module.exports = model('UserProxy', UserProxySchema);

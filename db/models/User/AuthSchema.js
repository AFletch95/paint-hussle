const { Schema } = require('mongoose');

const AuthSchema = new Schema(
  {
    google: {
      type: {
        id: String,
        token: String,
      },
    },
  },
  { _id: false },
);

module.exports = AuthSchema;

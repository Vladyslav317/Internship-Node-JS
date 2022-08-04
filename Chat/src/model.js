const { Schema } = require('mongoose');
const connections = require('./connection');

const User = new Schema(
  {
    user: {
      type: String,
    },
  },
  {
    collection: 'chatmodel',
    versionKey: false,
    timestamps: true,
  },
);

module.exports = connections.model('Chatmodel', User);

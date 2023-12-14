const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');

const discussionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
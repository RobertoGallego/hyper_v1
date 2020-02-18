const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
  userId: String,
  username: String,
  body: String,
  createdAt: String,
  movieId: Number
});

module.exports = model('Comment', commentSchema);

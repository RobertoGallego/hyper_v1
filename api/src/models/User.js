const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  facebookId: String,
  googleId: String,
  fortytwoId: String,
  prenom: String,
  nom: String,
  password: String,
  email: String,
  createdAt: String,
  image: String,
  isVerified: { type: Boolean, default: false },
  seenMovies: [String]
});

module.exports = model('User', userSchema);

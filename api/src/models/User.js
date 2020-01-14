const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  prenom: String,
  nom: String,
  password: String,
  email: String,
  createdAt: String,
  isVerified: { type: Boolean, default: false },
});

module.exports = model('User', userSchema);

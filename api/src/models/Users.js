const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  facebookId: String,
  firstName: String,
  lastName: String,
  email: String
});

const User = mongoose.model('AuthFacebook', userSchema);
// const User = mongoose.model('users', userSchema);

module.exports = User;

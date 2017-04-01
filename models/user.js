const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email     : String,
  password  : String,
})

let User = mongoose.model('User', userSchema)

module.exports = User

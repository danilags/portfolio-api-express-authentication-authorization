const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validators = require('mongoose-validators');

let userSchema = new Schema({
  email     : {type: String, validate: validators.isEmail()},
  password  : {
    type : String,
    validate : validators.isLength(5, 20)
  },
  role      : String
})

let User = mongoose.model('User', userSchema)

module.exports = User

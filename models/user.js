const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');


let emailValidator = [
  validate({
    validator: 'isEmail',
    message : 'Email is wrong!'
  })
];

let passwordValidator = [
  validate({
    validator : 'isLength',
    arguments: [5],
    message: "Password's length min 5"
  })
]

let userSchema = new Schema({
  email     : {
    type: String,
    required: true['is require'],
    validate: emailValidator},
  password  : {
    type : String,
    required :  true,
    validate : passwordValidator
  },
  role      : String
})

let User = mongoose.model('User', userSchema)

module.exports = User

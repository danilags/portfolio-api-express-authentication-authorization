const db = require('../models/user');
const jwt = require('jsonwebtoken');
const hash = require('password-hash')

let createUser = function(req, res) {
  db.create({
    email     : req.body.email,
    password  : hash.generate(req.body.password)
  }, function(err, data) {
    if (err) {
      res.send(err.messagae)
    } else {
      res.send(data)
    }
  })
}

let getAllUser = function(req, res) {
  db.find(function(err, users) {
    res.send(users)
  })
}

let updateUser = function(req, res) {
  db.findByIdAndUpdate(req.params.id, {
    $set : {
      email     : req.body.email,
      password  : req.body.password
    }
  }, function(err, userUpdated) {
    if (err) {
      res.send(err.messagae)
    } else {
      res.send("Data success updated !")
    }
  })
}

let deleteUser = function(req, res) {
  db.findByIdAndRemove(req.params.id,
    function(err, data) {
      if (err) {
        res.send(err.message)
      } else {
        res.send("Data success deleted !")
      }
    })
}

// give token if success login
let login = function(req, res) {
  let token = jwt.sign({email : req.body.email}, "agustosidabutaro")
  res.send(token)
}

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  login
}

const jwt = require('jsonwebtoken');
const db = require('../models/user');
require('dotenv').config();

let authorization = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.SECRET_WORD,
  function(err, decoded) {
    if (decoded) {
      if (decoded.role == "Admin") {
        next()
      } else {
        db.findOne({email : decoded.email}, function(err, data) {
          if (err) {
            res.send("Gagal akses")
          } else {
            if (data) {
              next()
            } else {
              res.send("User tidak ditemukan !")
            }
          }
        })
      }
    } else {
      res.send("You dont have access!")
    }
  })
}

module.exports = authorization

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');
const Strategy = passportLocal.Strategy;
const User = require('./models/user');
const pwh = require('password-hash');
const index = require('./routes/index');
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', index)

passport.use(new Strategy(function(username, password, callback) {
  User.findOne({ email : username },
    function(err, data) {
      if (err) {
        return callback(err)
      } else {
        if (data != null) {
          if (pwh.verify(password, data.password)) {
            return callback(null, data)
          } else {
            return callback("Password is wrong! Try Again..")
          }
        } else {
          return callback("User undifined !")
        }
      }
    }
  )
}))

mongoose.connect('mongodb://localhost/library')
mongoose.connection.on('connected', function() {
  console.log('Mongodb is connected !');
})

app.listen(3000, function() {
  console.log('App is running !');
})

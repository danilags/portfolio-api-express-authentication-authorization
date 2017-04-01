const express = require('express');
const router = express.Router();
const db = require('../models/user');
const passport = require('passport');
const contUser = require('../controller/user');

router.get('/', function(req, res) {
  res.send('Selamat Datang di Beranda !')
})

router.post('/users', contUser.createUser)

router.get('/users', contUser.getAllUser)

router.put('/users/:id', contUser.updateUser)

router.delete('/users/:id', contUser.deleteUser)

router.post('/login', passport.authenticate('local', {session: false}), contUser.login)

module.exports = router

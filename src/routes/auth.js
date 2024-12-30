var express = require('express');
var router = express.Router();
const path = require('path');
const { Login, Register, GeneratePassword, ChangePassword, Logout } = require('../controller/auth.js');

router.get('/', function (req, res, next) {
   const { userType } = req.session
   if (req.isAuthenticated()) {
      console.log('LOG-USER-TYPE', userType)
      if (userType === 'ADMINISTRATOR') {
         return res.redirect('/dashboard')
      } else if (userType === 'DONATUR') {
         return res.redirect('/donasi/donasi')
      }

   } else {
      res.redirect('/auth/login')
   }
});

router.get('/login', function (req, res, next) {
   const { userType } = req.session
   if (req.isAuthenticated()) {
      if (userType === 'ADMINISTRATOR') {
         return res.redirect('/dashboard')
      } else if (userType === 'DONATUR') {
         return res.redirect('/donasi/donasi')
      }
   } else {
      res.render(path.join(__dirname, '../../src/views/pages/auth/login.ejs'));
   }
});
router.post('/login', Login);
router.get('/register', function (req, res, next) {
   res.render(path.join(__dirname, '../../src/views/pages/auth/register.ejs'));
});
router.post('/register', Register);
router.get('/generate-password', GeneratePassword);
router.post('/change-password', ChangePassword);
router.post('/Logout', Logout);

module.exports = router;

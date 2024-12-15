var express = require('express');
var router = express.Router();
const path = require('path');
const { Login, Register, GeneratePassword, ChangePassword } = require('../controller/auth.js');

router.get('/', function (req, res, next) {
   if (req.isAuthenticated()) {
      res.redirect('/dashboard')
   } else {
      res.redirect('/auth/login')
   }
});

router.get('/login', function (req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect('/dashboard')
   } else {
      res.render(path.join(__dirname, '../../src/views/pages/auth/login.ejs'));
   }
});
router.post('/login', Login);
router.get('/register', Register);
router.post('/register', Register);
router.get('/generate-password', GeneratePassword);
router.post('/change-password', ChangePassword);

module.exports = router;

var express = require('express');
var router = express.Router();
const { Login, Register, GeneratePassword, ChangePassword } = require('../controller/auth.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
// router.get('/auth', function (req, res) { res.redirect('/auth/login') })
router.get('/login', Login);
router.post('/login', Login);
router.get('/register', Register);
router.post('/register', Register);
router.get('/generate-password', GeneratePassword);
router.post('/change-password', ChangePassword);

module.exports = router;

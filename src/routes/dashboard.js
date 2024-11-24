var express = require('express');
const passport = require('passport');
const path = require('path');
const { AuthMiddleware, checkAuthenticated } = require('../middleware/auth');
// const { AuthMiddleware } = require('../middleware/auth');
// const { AuthMiddleware } = require('../middleware/passport');
var router = express.Router();

// router.use(passport.initialize());
// router.use(passport.session());
// require('../middleware/passport')(passport);


router.get('/', AuthMiddleware.isAuthenticated,
   function (req, res, next) {
      res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   })

module.exports = router;

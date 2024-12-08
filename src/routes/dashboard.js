var express = require('express');
const passport = require('passport');
const path = require('path');
const { AuthMiddleware, checkAuthenticated } = require('../middleware/auth');
const dashboard = require('../controller/dashboard');
// const { AuthMiddleware } = require('../middleware/auth');
// const { AuthMiddleware } = require('../middleware/passport');
var router = express.Router();

// router.use(passport.initialize());
// router.use(passport.session());
// require('../middleware/passport')(passport);


router.get('/', AuthMiddleware.isAuthenticated, dashboard.Dashboard)

module.exports = router;

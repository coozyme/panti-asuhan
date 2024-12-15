var express = require('express');
// const path = require('path');
const landingPage = require('../controller/landingPage');
var router = express.Router();

router.get('/', landingPage.LandingPage)

module.exports = router;

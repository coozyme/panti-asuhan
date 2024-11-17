var express = require('express');
const path = require('path');
var router = express.Router();
router.get('/donasi', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/donasi/donasi.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})
router.get('/donatur', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/donasi/donatur.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})
router.get('/rekening', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/donasi/rekening.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})

module.exports = router;

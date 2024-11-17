var express = require('express');
const path = require('path');
var router = express.Router();
router.get('/donasi', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/report/donasi.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})
router.get('/pengeluaran', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/report/pengeluaran.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})

module.exports = router;

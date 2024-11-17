var express = require('express');
const path = require('path');
var router = express.Router();
router.get('/', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/anak-asuh/anak-asuh.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})
router.get('/tambah-anak-asuh', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/anak-asuh/tambah-anak-asuh.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})

module.exports = router;

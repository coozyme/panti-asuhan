var express = require('express');
const path = require('path');
const donasi = require('../controller/donasi');
const { AuthMiddleware } = require('../middleware/auth');
const uploadFile = require('../config/storage');
var router = express.Router();
router.get('/donasi', AuthMiddleware.isAuthenticated, donasi.GetDonasi);
router.post('/add-manual', AuthMiddleware.isAuthenticated, uploadFile("donasi").single('file'), donasi.AddDonasiManual);
router.post('/edit-donasi/:id', AuthMiddleware.isAuthenticated, uploadFile("donasi").single('file'), donasi.EditDonasi);
router.post('/verification/:id/:status', AuthMiddleware.isAuthenticated, donasi.VerificationDonasi);
router.get('/donatur', AuthMiddleware.isAuthenticated, donasi.GetDonasi);
router.get('/rekening', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/donasi/rekening.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})

module.exports = router;

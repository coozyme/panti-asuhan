var express = require('express');
const path = require('path');
const laporan = require('../controller/laporan');
const { AuthMiddleware } = require('../middleware/auth');
const uploadFile = require('../config/storage');
var router = express.Router();
router.get('/donasi', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/report/donasi.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})
router.get('/pengeluaran', AuthMiddleware.isAuthenticated, laporan.Pengeluaran)

router.post('/tambah-pengeluaran', AuthMiddleware.isAuthenticated, uploadFile("pengeluaran").single('file'), laporan.AddLaporanPengeluaran)

module.exports = router;

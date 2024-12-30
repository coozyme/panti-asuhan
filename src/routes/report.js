var express = require('express');
const path = require('path');
const laporan = require('../controller/laporan');
const { AuthMiddleware } = require('../middleware/auth');
const uploadFile = require('../config/storage');
var router = express.Router();
router.get('/donasi', AuthMiddleware.isAuthenticated, laporan.Donasi)
router.get('/pengeluaran', AuthMiddleware.isAuthenticated, laporan.Pengeluaran)

router.post('/tambah-pengeluaran', AuthMiddleware.isAuthenticated, uploadFile("pengeluaran").single('file'), laporan.AddLaporanPengeluaran)
router.post('/ubah-pengeluaran/:id', AuthMiddleware.isAuthenticated, uploadFile("pengeluaran").single('file'), laporan.EditPengeluaran)
router.delete('/pengeluaran/:id', AuthMiddleware.isAuthenticated, laporan.DeletePengeluaran)

module.exports = router;

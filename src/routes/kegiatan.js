var express = require('express');
const path = require('path');
const { AuthMiddleware } = require('../middleware/auth');
const kegiatan = require('../controller/kegiatan');
const uploadFile = require('../config/storage');
var router = express.Router();

router.get('/', AuthMiddleware.isAuthenticated, kegiatan.GetPage)
router.get('/tambah-kegiatan', AuthMiddleware.isAuthenticated, kegiatan.GetPageTambahKegiatan)
router.post('/tambah-kegiatan', AuthMiddleware.isAuthenticated, uploadFile("galeri").array('file', 100), kegiatan.AddKegiatan)
router.get('/edit-kegiatan/:id', AuthMiddleware.isAuthenticated, kegiatan.GetPageEdit)
router.post('/edit-kegiatan/:id', AuthMiddleware.isAuthenticated, uploadFile("galeri").array('file', 100), kegiatan.UpdateKegiatan)
router.delete('/:id', AuthMiddleware.isAuthenticated, kegiatan.DeleteKegiatan)
module.exports = router;
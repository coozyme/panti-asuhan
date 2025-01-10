var express = require('express');
const path = require('path');
const donasi = require('../controller/donasi');
const { AuthMiddleware } = require('../middleware/auth');
const uploadFile = require('../config/storage');
const { Donatur } = require('../controller/management-user');
var router = express.Router();
router.get('/donasi', AuthMiddleware.isAuthenticated, donasi.GetDonasi);
router.delete('/donasi/:id', AuthMiddleware.isAuthenticated, donasi.DeleteDonasi);
router.post('/add-manual', AuthMiddleware.isAuthenticated, uploadFile("donasi").single('file'), donasi.AddDonasiManual);
router.post('/berdonasi', uploadFile("donasi").single('file'), donasi.AddDonasiLandingPage);
router.post('/edit-donasi/:id', AuthMiddleware.isAuthenticated, uploadFile("donasi").single('file'), donasi.EditDonasi);
router.post('/verification/:id/:status', AuthMiddleware.isAuthenticated, donasi.VerificationDonasi);
router.get('/donatur', AuthMiddleware.isAuthenticated, Donatur);

module.exports = router;

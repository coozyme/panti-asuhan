var express = require('express');
const path = require('path');
const { AuthMiddleware } = require('../middleware/auth');
const anakAsuh = require('../controller/anak-asuh');
const uploadFile = require('../config/storage');
var router = express.Router();

router.get('/', AuthMiddleware.isAuthenticated,
   anakAsuh.GetDataAnakAsuh)

router.get('/tambah-anak-asuh', function (req, res) {
   res.render(path.join(__dirname, '../../src/views/pages/anak-asuh/tambah-anak-asuh.ejs'));
})

router.post('/tambah-anak-asuh', AuthMiddleware.isAuthenticated, uploadFile("profile").single('file'),
   anakAsuh.AddAnakAsuh
)

router.get('/edit-anak-asuh/:id', AuthMiddleware.isAuthenticated,
   anakAsuh.EditAnakAsuhPage
)

router.post('/edit-anak-asuh/:id', AuthMiddleware.isAuthenticated, uploadFile("profile").single('file'),
   anakAsuh.UpdateDataAnakAsuh
)

module.exports = router;

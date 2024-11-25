var express = require('express');
const path = require('path');
const { AuthMiddleware } = require('../middleware/auth');
const anakAsuh = require('../controller/anak-asuh');
var router = express.Router();

router.get('/', AuthMiddleware.isAuthenticated,
   anakAsuh.GetDataAnakAsuh)

router.get('/tambah-anak-asuh', function (req, res) {
   res.render(path.join(__dirname, '../../src/views/pages/anak-asuh/tambah-anak-asuh.ejs'));
})

router.post('/tambah-anak-asuh', AuthMiddleware.isAuthenticated,
   anakAsuh.AddAnakAsuh
)

module.exports = router;

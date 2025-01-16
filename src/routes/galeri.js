var express = require('express');
// const path = require('path');
const galeri = require('../controller/galeri');
var router = express.Router();

router.get('/:id',
   galeri.Galeri
)

module.exports = router;

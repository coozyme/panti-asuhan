var express = require('express');
var router = express.Router();
const { Live, GetAllByUserID } = require('../controller/absensi.js')


router.post('/', Live);
router.get('/user/:userId', GetAllByUserID);

module.exports = router;

var express = require('express');
var router = express.Router();
const { SetCuti, RequestCuti, GetAllCutiByCutiId, ApproveCuti, GetCutiUser } = require('../controller/cuti.js');
const { AuthenticateToken } = require('../middleware/auth.js');


router.get('/data-cuti', AuthenticateToken, GetCutiUser);
router.post('/set-leave', SetCuti);
router.post('/request-leave', RequestCuti);
router.get('/:cutiId', GetAllCutiByCutiId);
router.post('/approval/:id/:cutiID', ApproveCuti);

module.exports = router;

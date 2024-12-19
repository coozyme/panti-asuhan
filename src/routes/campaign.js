var express = require('express');
const path = require('path');
const campaign = require('../controller/campaign');
const { AuthMiddleware } = require('../middleware/auth');
const uploadFile = require('../config/storage');
var router = express.Router();

router.get('/donasi', campaign.GetCampaignDonasi)
router.get('/tambah-campaign-donasi', function (req, res) {
   // res.send('Hello World!')
   // res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'));
   res.render(path.join(__dirname, '../../src/views/pages/campaign/tambah-campaign-donasi.ejs'));
   // res.render('landing-page/landing-page.ejs', {
   // });
})
router.post('/tambah-campaign-donasi', AuthMiddleware.isAuthenticated, uploadFile("campaign").single('file'), campaign.AddCampaignDonasi);
router.post('/edit-campaign-donasi/:id', AuthMiddleware.isAuthenticated, uploadFile("campaign").single('file'), campaign.UpdateCampaignDonasi);
// router.post('/tambah-campaign-donasi', uploadFile.single('file'), function (req, res, next) {
// req.file is the `profile-file` file
// req.body will hold the text fields, if there were any

// console.log('LOG-SAD', JSON.stringify(req.file))
// var response = '<a href="/">Home</a><br>'
// response += "Files uploaded successfully.<br>"
// response += `<img src="${req.file.path}" /><br>`
// return res.send(response)
// });



module.exports = router;

const { CampaignDonasi } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia, GetDate } = require("../utils/times/timezone");
const user = require('./user');
const path = require('path');
const moment = require("moment");
const multer = require("multer");
const { formatRupiah } = require("../utils/currency/format");

module.exports = {
   AddCampaignDonasi: async (req, res) => {
      const { userId } = req.session
      const {
         judul,
         deskripsi,
         targetDonasi,
         tanggalMulai,
         tanggalSelesai,
         isPrimaryCampaign,
         status,
      } = req.body
      console.log("LOG-req.body", req.body)
      const { filename } = req.file

      const checkListprimaryCampaign = (isPrimaryCampaign && isPrimaryCampaign == 'on') ? 1 : 0
      console.log("LOG-checkListprimaryCampaign", checkListprimaryCampaign)
      await CampaignDonasi.create({
         judul: judul,
         deskripsi: deskripsi,
         photo: filename,
         target_donasi: targetDonasi,
         tanggal_mulai: moment(tanggalMulai).format("YYYY-MM-DD"),
         tanggal_selesai: moment(tanggalSelesai).format("YYYY-MM-DD"),
         status: status,
         main_campaign: checkListprimaryCampaign,
         id_admin: userId
      })

      res.redirect('/campaign/donasi')
   },
   GetCampaignDonasi: async (req, res) => {
      await CampaignDonasi.findAll({}).then((data) => {
         const datas = data.map((item) => {

            // get photo from storage folder 
            // const photo = item.photo ? `/images/${item.photo}` : null
            // find photo from public folder 
            const photo = item.photo ? path.join(__dirname, '../../uploads/' + item.photo) : null


            console.log("LOG-PHOTO", photo)
            return {
               id: item.id,
               judul: item.judul,
               deskripsi: item.deskripsi,
               targetDonasi: formatRupiah(item.target_donasi),
               terkumpul: formatRupiah(item.terkumpul),
               tanggalMulai: new moment(item.tanggal_mulai).format("DD MMM YYYY"),
               tanggalSelesai: new moment(item.tanggal_selesai).format("DD MMM YYYY"),
               photo: photo,
               status: item.status,
               mainCampaign: item.main_campaign,
            }
         })
         res.render(path.join(__dirname, '../../src/views/pages/campaign/donasi.ejs'), { data: datas });
      })
   },
}
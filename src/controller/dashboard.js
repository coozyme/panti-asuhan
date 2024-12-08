const path = require("path");
const { AnakAsuh, Donasi } = require("../models");
const { where } = require("sequelize");


module.exports = {
   Dashboard: async (req, res) => {

      const anakYatim = await AnakAsuh.count({
         where: {
            status: "YATIM"
         }
      })

      const anakPiatu = await AnakAsuh.count({
         where: {
            status: "PIATU"
         }
      })
      const anakYatimPiatu = await AnakAsuh.count({
         where: {
            status: "YATIM PIATU"
         }
      })

      const anakDhuafa = await AnakAsuh.count({
         where: {
            status: "DHUAFA"
         }
      })
      const donasiVerified = await Donasi.count({
         status_verifikasi: "VERIFIED"
      })
      const donasiBelumVerified = await Donasi.count({
         status_verifikasi: "PENDING"
      })

      const totalDonasi = await Donasi.sum('jumlah', {
         where: {
            status_verifikasi: 'VERIFIED'
         }
      });


      const dataCount = {
         yatim: anakYatim,
         piatu: anakPiatu,
         yatimPiatu: anakYatimPiatu,
         dhuafa: anakDhuafa,
         donasiVerified: donasiVerified,
         donasiBelumVerified: donasiBelumVerified,
         totalDonasi: totalDonasi
      }

      res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'), { data: dataCount });
   }
}
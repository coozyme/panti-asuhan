const path = require("path");
const { CampaignDonasi } = require("../models");

module.exports = {
   Pengeluaran: async (req, res) => {
      const campaiignList = await CampaignDonasi.findAll({
         where: {
            status: 1
         }
      })
      console.log('campaiignList', campaiignList)

      // const 
      res.render(path.join(__dirname, '../../src/views/pages/report/pengeluaran.ejs'));
   },

   AddLaporanPengeluaran: async (req, res) => {
      const { userId } = req.session
      const { filename } = req.file
      const {
         idCampaign,
         keterangan,
         jumlah,
         tanggal
      } = req.body
      console.log('REQ-userId', userId)
      console.log('REQ-BODY', req.body)
      console.log('REQ-filename', filename)

      const objectData = {
         id_campaign_donasin: idCampaign,
         keterangan: keterangan,
         jumlah: jumlah,
         tanggal: tanggal,
         foto: filename,
         id_admin: userId
      }

      if (!filename) {
         delete objectData.foto
      }

      await Pengeluaran.create(objectData)
   },
}
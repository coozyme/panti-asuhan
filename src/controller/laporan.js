const path = require("path");
const { CampaignDonasi, Pengeluaran } = require("../models");

module.exports = {
   Pengeluaran: async (req, res) => {
      const listCampaign = await CampaignDonasi.findAll()

      const listPengeluaran = await Pengeluaran.findAll({
         include: [
            {
               model: CampaignDonasi,
               as: 'campaignDonasi',
               attributes: ['judul']
            }
         ]
      })

      console.log('listPengeluaran', listPengeluaran)

      res.render(path.join(__dirname, '../../src/views/pages/report/pengeluaran.ejs'), { listCampaign: listCampaign, listPengeluaran: listPengeluaran });
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

      const objectData = {
         id_campaign_donasi: String(idCampaign) === '0' ? null : parseInt(idCampaign),
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
      res.redirect('/laporan/pengeluaran')
   },
}
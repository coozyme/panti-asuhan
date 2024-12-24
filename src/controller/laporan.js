const path = require("path");
const { CampaignDonasi, Pengeluaran } = require("../models");
const config = require("../config/config");
const { formatRupiah } = require("../utils/currency/format");
const moment = require("moment");

module.exports = {
   Pengeluaran: async (req, res) => {
      const listCampaign = await CampaignDonasi.findAll()

      let listPengeluaran = await Pengeluaran.findAll({
         where: {
            deleted_at: null
         },
         include: [
            {
               model: CampaignDonasi,
               as: 'campaignDonasi',
               attributes: ['id', 'judul']
            }
         ]
      })

      listPengeluaran = listPengeluaran.map((item) => {
         return {
            id: item.id,
            keterangan: item.keterangan,
            jumlah: formatRupiah(item.jumlah),
            tanggal: moment(item.tanggal).format("DD MMM YYYY"),
            foto: item.foto ? `http://${config.url}/uploads/pengeluaran/${item.foto}` : null,
            judulCampaign: item.campaignDonasi ? item.campaignDonasi.judul : null,
            campaignId: item.campaignDonasi ? item.campaignDonasi.id : null
         }
      })

      res.render(path.join(__dirname, '../../src/views/pages/report/pengeluaran.ejs'), { listCampaign: listCampaign, listPengeluaran: listPengeluaran });
   },

   AddLaporanPengeluaran: async (req, res) => {
      const { userId } = req.session
      console.log('req.body', req.body)
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

         id_admin: userId
      }
      console.log('objectData-req.file.filename', req.file)
      if (req.file) {
         objectData.foto = req.file.filename
      }

      await Pengeluaran.create(objectData)
      res.redirect('/laporan/pengeluaran')
   },

   DeletePengeluaran: async (req, res) => {
      const { id } = req.params
      const { userId } = req.session
      console.log('id', id)
      try {
         await Pengeluaran.update(
            {
               id_admin: userId,
               deleted_at: new Date()
            }, {
            where: {
               id: id
            }
         })

         res.redirect('/laporan/pengeluaran')

      } catch (error) {
         console.log('error-22', error)
      }
   },

   EditPengeluaran: async (req, res) => {
      const { id } = req.params
      const { userId } = req.session
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

         id_admin: userId
      }

      if (req.file) {
         objectData.foto = req.file.filename
      }

      await Pengeluaran.update(objectData, {
         where: {
            id: id
         }
      })

      res.redirect('/laporan/pengeluaran')
   }
}
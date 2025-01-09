const path = require("path");
const { CampaignDonasi, Pengeluaran, Donasi } = require("../models");
const config = require("../config/config");
const { formatRupiah } = require("../utils/currency/format");
const moment = require("moment");
const { Op, where, Sequelize } = require("sequelize");

module.exports = {
   Pengeluaran: async (req, res) => {
      console.log('req.BODY', req.body)
      console.log('req.PARAMS', req.params)
      console.log('req.QUERY', req.query)
      // const { campaignID } = req.query

      let campaignID = ''

      if (req.query) {
         campaignID = req.query.campaignID
      }

      let listCampaign = await CampaignDonasi.findAll(
         {
            order: [
               ['judul', 'ASC']
            ],
         }
      )
      console.log('campaignID', campaignID)
      let totalPengeluaran = 0
      if (campaignID) {
         let listPengeluaran = await Pengeluaran.findAll({
            order: [
               ['created_at', 'DESC']
            ],
            where: {
               deleted_at: null
            },
            include: [
               {
                  model: CampaignDonasi,
                  as: 'campaignDonasi',
                  attributes: ['id', 'judul'],
                  where: {
                     id: parseInt(campaignID)
                  }
               }
            ]
         })

         listPengeluaran = listPengeluaran.map((item) => {
            totalPengeluaran += item.jumlah
            return {
               id: item.id,
               keterangan: item.keterangan,
               jumlahFormated: formatRupiah(item.jumlah),
               jumlah: item.jumlah,
               tanggal: moment(item.tanggal).format("DD MMM YYYY"),
               tanggalFormated: new Date(item.tanggal).toISOString().split('T')[0],
               foto: item.foto ? `http://${config.url}/uploads/pengeluaran/${item.foto}` : null,
               judulCampaign: item.campaignDonasi ? item.campaignDonasi.judul : null,
               campaignId: item.campaignDonasi ? item.campaignDonasi.id : null
            }
         })
         const dataAggregate = {
            totalPengeluaran: formatRupiah(totalPengeluaran),
            listPengeluaran: listPengeluaran
         }

         res.render(path.join(__dirname, '../../src/views/pages/report/pengeluaran.ejs'), { session: req.session, listCampaign: listCampaign, dataAggregate: dataAggregate });
         return
      }

      let listPengeluaran = await Pengeluaran.findAll({
         order: [
            ['created_at', 'DESC']
         ],
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
         totalPengeluaran += item.jumlah
         return {
            id: item.id,
            keterangan: item.keterangan,
            jumlahFormated: formatRupiah(item.jumlah),
            jumlah: item.jumlah,
            tanggal: moment(item.tanggal).format("DD MMM YYYY"),
            tanggalFormated: new Date(item.tanggal).toISOString().split('T')[0],
            foto: item.foto ? `http://${config.url}/uploads/pengeluaran/${item.foto}` : null,
            judulCampaign: item.campaignDonasi ? item.campaignDonasi.judul : null,
            campaignId: item.campaignDonasi ? item.campaignDonasi.id : null
         }
      })

      const dataAggregate = {
         totalPengeluaran: formatRupiah(totalPengeluaran),
         listPengeluaran: listPengeluaran
      }

      res.render(path.join(__dirname, '../../src/views/pages/report/pengeluaran.ejs'), { session: req.session, listCampaign: listCampaign, dataAggregate: dataAggregate });
   },

   PengeluaranPerID: async (req, res) => {
      console.log('req.BODY', req.body)
      console.log('req.PARAMS', req.params)
      console.log('req.QUERY', req.query)
      const listCampaign = await CampaignDonasi.findAll(
         {
            order: [
               ['judul', 'ASC']
            ],
         }
      )

      let listPengeluaran = await Pengeluaran.findAll({
         order: [
            ['created_at', 'DESC']
         ],
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
            jumlahFormated: formatRupiah(item.jumlah),
            jumlah: item.jumlah,
            tanggal: moment(item.tanggal).format("DD MMM YYYY"),
            tanggalFormated: new Date(item.tanggal).toISOString().split('T')[0],
            foto: item.foto ? `http://${config.url}/uploads/pengeluaran/${item.foto}` : null,
            judulCampaign: item.campaignDonasi ? item.campaignDonasi.judul : null,
            campaignId: item.campaignDonasi ? item.campaignDonasi.id : null
         }
      })

      res.render(path.join(__dirname, '../../src/views/pages/report/pengeluaran.ejs'), { session: req.session, listCampaign: listCampaign, listPengeluaran: listPengeluaran });
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
         tanggal: new moment(tanggal).format("YYYY-MM-DD"),

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

      try {
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
            id_admin: userId,
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
      } catch (error) {
         console.log('error-22', error)
      }
   },

   Donasi: async (req, res) => {
      try {

         const campaign = await CampaignDonasi.findAll({
            where: {
               status: 'UNPUBLISH'
            },
            order: [
               ['judul', 'ASC']
            ],
         })

         const ob = []
         const dataLaporanAggregation = await Promise.all(
            campaign.map(async (item) => {
               const totalPengeluaran = await Pengeluaran.findAll({
                  attributes: [
                     [Sequelize.fn('SUM', Sequelize.col('jumlah')), 'total_jumlah'],
                  ],
                  where: {
                     deleted_at: null,
                     id_campaign_donasi: item.id
                  },
                  include: [
                     {
                        model: CampaignDonasi,
                        as: 'campaignDonasi',
                        attributes: ['id', 'judul'],
                     }
                  ],
                  group: ['id_campaign_donasi']
               });

               if (totalPengeluaran.length > 0) {
                  const dataAggregate = totalPengeluaran[0].dataValues
                  const sisaDana = item.terkumpul - dataAggregate.total_jumlah

                  const objs = {
                     idCampaign: item.id,
                     namaCampaign: item.judul,
                     targetDonasi: formatRupiah(item.target_donasi),
                     terkumpul: formatRupiah(item.terkumpul),
                     totalPengeluaran: formatRupiah(dataAggregate.total_jumlah),
                     sisaDana: formatRupiah(sisaDana),
                  }

                  // return 
                  console.log('objs--1', objs)
                  ob.push(objs)
               }

            })
         );

         res.render(path.join(__dirname, '../../src/views/pages/report/donasi.ejs'), { session: req.session, campaign: campaign, dataAggregation: ob });
      } catch (error) {
         console.log('error-22', error)
      }
   }
}
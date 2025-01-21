const { Donasi, CampaignDonasi } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia, GetDate } = require("../utils/times/timezone");
const user = require('./user');
const moment = require("moment");
const path = require('path');
const { formatRupiah, getNominal } = require("../utils/currency/format");
const config = require("../config/config");
const { convertDateFormat } = require("../utils/times/datetime");
const { Op } = require("sequelize");

module.exports = {
   AddDonasiManual: async (req, res) => {
      const { userId } = req.session
      const { filename } = req.file
      const {
         campaignID,
         namaDonatur,
         jumlah,
         methode,
         status,
         catatan,
         tanggalDonasi,
         tanggalVerifikasi
      } = req.body
      console.log('REQ-userId', userId)
      console.log('REQ-BODY', req.body)
      console.log('REQ-filename', filename)

      const objectData = {
         id_campaign_donasi: campaignID,
         donatur: namaDonatur,
         jumlah: jumlah,
         metode: methode,
         status_verifikasi: status,
         tanggal_submit: convertDateFormat(tanggalDonasi),
         tanggal_verifikasi: convertDateFormat(tanggalVerifikasi),
         catatan: catatan,
         foto: filename,
         id_admin: userId
      }

      await Donasi.create(objectData)
   },
   AddDonasiLandingPage: async (req, res) => {
      const {
         item_id,
         donatur,
         jumlah,
         catatan,
      } = req.body

      console.log('REQ-body', req.body)
      console.log('REQ-file', req.file)
      const objectData = {
         id_campaign_donasi: parseInt(item_id),
         donatur: donatur,
         jumlah: parseFloat(jumlah),
         metode: "TRANSFER",
         tanggal_submit: new Date(),
         catatan: catatan,
      }

      if (req.file) {
         objectData.foto = req.file.filename
      }
      try {
         await Donasi.create(objectData)
         console.log('RETURN')
         return Response(res, 200, true, "Donasi berhasil ditambahkan")
      } catch (error) {
         return Response(res, 400, false, "Donasi gagal ditambahkan")
      }
   },
   EditDonasi: async (req, res) => {
      const { userId } = req.session
      const filename = req.file?.filename
      const {
         campaignID,
         namaDonatur,
         jumlah,
         methode,
         status,
         catatan,
         tanggalDonasi,
         tanggalVerifikasi
      } = req.body
      console.log('REQ-tanggalDonasi', tanggalDonasi)
      const { id } = req.params

      const objectData = {
         donatur: namaDonatur,
         id_campaign_donasi: campaignID,
         jumlah: jumlah,
         metode: methode,
         status_verifikasi: status,
         tanggal_submit: tanggalDonasi,
         tanggal_verifikasi: tanggalVerifikasi,
         catatan: catatan,
         id_admin: userId
      }

      if (filename) {
         objectData.foto = filename
      }

      await Donasi.update(objectData, {
         where: {
            id: id
         }
      })

      // const generatePassword = await GeneratePassword()

      // const data = await Admin.findAll()
      // const datas = data.map((item) => {
      //    return {
      //       id: item.id,
      //       fullname: item.fullname,
      //       email: item.email,
      //       username: item.username,
      //       number_phone: item.number_phone,
      //       is_active: item.is_active ? 'active' : 'inactive',
      //       created_at: item.created_at,
      //       updated_at: item.updated_at,
      //    }
      // }
      // )
      res.redirect('/donasi/donasi')
      // res.render(path.join(__dirname, '../../src/views/pages/management-user/administrator.ejs'), { data: datas, generatePassword: generatePassword });
   },

   GetDonasi: async (req, res) => {

      // let statusDonasi = ''
      let startDate = ''
      let endDate = ''

      let queryWhere = {
         deleted_at: null
      }
      console.log('REQ-QUERY', req.query)

      if (req.query) {
         campaignID = req.query.campaignID

         if (req.query.status) {
            queryWhere.status_verifikasi = req.query.status.toUpperCase()
            // statusDonasi = req.query.status
         }
         if (req.query.start || req.query.end) {
            startDate = moment(req.query.start).endOf('day').format('YYYY-MM-DD HH:mm:ss') || new Date()
            endDate = moment(req.query.end).endOf('day').format('YYYY-MM-DD HH:mm:ss') || new Date()

            console.log('START-DATE', startDate, endDate)
            queryWhere.tanggal_submit = {
               [Op.gte]: startDate,
               [Op.lte]: endDate
            }
         }

         // if (req.query.endDate) {
         //    endDate = req.query.endDate
         // }

      }
      console.log('QUERY-WHERE', queryWhere)

      const campaignDonasi = await CampaignDonasi.findAll()

      await Donasi.findAll({
         where: queryWhere,
         order: [
            ['created_at', 'DESC']
         ],
         include: [
            {
               model: CampaignDonasi,
               as: 'campaign_donasi'
            }
         ]
      }).then((data) => {
         const datas = data.map((item) => {
            // console.log('DATA-DONASI', item.cam paign_donasi)
            const photo = item.foto ? `http://${config.url}/uploads/donasi/${item.foto}` : null
            return {
               id: item.id,
               campaignId: item.id_campaign_donasi,
               campaignName: item.campaign_donasi ? item.campaign_donasi.judul : "-",
               donatur: item.donatur,
               jumlah: formatRupiah(item.jumlah),
               jumlahNominal: item.jumlah,
               metode: item.metode,
               catatan: item.catatan ? item.catatan : "-",
               photo: photo,
               status_verifikasi: item.status_verifikasi,
               tanggal_submit: moment(item.tanggal_submit).format("DD MMM YYYY"),
               tanggal_verifikasi: item.tanggal_verifikasi ? moment(item.tanggal_verifikasi).format("DD MMM YYYY") : "-",
               url_verified: `/donasi/verification/${item.id}/VERIFIED`,
               url_reject: `/donasi/verification/${item.id}/REJECT`,
               id_admin: item.id_admin,
               created_at: item.created_at,
               updated_at: item.updated_at,
            }
         }
         )

         res.render(path.join(__dirname, '../../src/views/pages/donasi/donasi.ejs'), { session: req.session, data: datas, campaign: campaignDonasi });
      })
   },

   DeleteDonasi: async (req, res) => {
      const { id } = req.params
      console.log('REQ-params-delete', req.params)
      try {
         await Donasi.update({
            deleted_at: new Date()
         }, {
            where: {
               id: parseInt(id)
            }
         })
         console.log('RETURN')
         return Response(res, 200, true, "Donasi berhasil dihapus")
      } catch (error) {
         return Response(res, 400, false, "Donasi gagal dihapus")
      }
   },

   VerificationDonasi: async (req, res) => {
      const { status, id } = req.params

      console.log('REQ-params', req.params)
      await Donasi.update({
         status_verifikasi: status,
         tanggal_verifikasi: new Date(),
      }, {
         where: {
            id: id,
         }
      })


      if (status === 'VERIFIED') {
         const donate = await Donasi.findOne({
            where: {
               id: id
            }
         })

         if (donate.id_campaign_donasi) {
            const dataDonasi = await CampaignDonasi.findOne({
               where: {
                  id: donate.id_campaign_donasi
               }
            })
            console.log("LOG=DONASD", dataDonasi)
            await CampaignDonasi.update({
               terkumpul: dataDonasi.terkumpul + donate.jumlah,
               updated_at: new Date(),
            }, {
               where: {
                  id: donate.id_campaign_donasi,
               }
            })
         }

         return res.redirect('/donasi/donasi')
      }


      return res.redirect('/donasi/donasi')
   },

}
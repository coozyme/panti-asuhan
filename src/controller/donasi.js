const { Donasi } = require("../models");
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

module.exports = {
   AddDonasiManual: async (req, res) => {
      const { userId } = req.session
      const { filename } = req.file
      const {
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
         donatur,
         jumlah,
         status,
         catatan,
         tanggalDonasi,
         tanggalVerifikasi
      } = req.body

      const objectData = {
         // id_campaign_donasi:,
         donatur: donatur,
         jumlah: jumlah,
         metode: "TRANSFER",
         tanggal_submit: new Date(),
         catatan: catatan,
      }

      if (req.file) {
         objectData.foto = filename
      }

      await Donasi.create(objectData)
   },
   EditDonasi: async (req, res) => {
      const { userId } = req.session
      const filename = req.file?.filename
      const {
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
      await Donasi.findAll({}).then((data) => {
         const datas = data.map((item) => {
            const photo = item.foto ? `http://${config.url}/uploads/donasi/${item.foto}` : null
            return {
               id: item.id,
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

         res.render(path.join(__dirname, '../../src/views/pages/donasi/donasi.ejs'), { data: datas });
      })
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

      res.redirect('/donasi/donasi')
   },

}
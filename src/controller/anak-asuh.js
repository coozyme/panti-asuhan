const { AnakAsuh } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia, GetDate } = require("../utils/times/timezone");
const user = require('./user');
const path = require('path');
const moment = require("moment");
const config = require("../config/config");

module.exports = {
   GetDataAnakAsuh: async (req, res) => {
      const datas = await AnakAsuh.findAll({})

      const dataAnakAsuh = datas.map((data) => {
         const photo = data.photo ? `http://${config.url}/uploads/profile/${data.photo}` : null
         return {
            id: data.id,
            namaLengkap: data.fullname,
            kelamin: data.kelamin,
            tempatLahir: data.tempat_lahir,
            tanggalLahir: data.tanggal_lahir,
            address: data.address,
            status: data.status,
            kelas: data.kelas,
            photo: photo,
            umur: new Date().getFullYear() - new Date(data.tanggal_lahir).getFullYear(),
            tanggalMasuk: data.tanggal_masuk,
            tanggalKeluar: data.tanggal_keluar,
            ayah: data.ayah,
            ibu: data.ibu,
            noHandphone: data.number_phone,
            keterangan: data.keterangan,
         }
      })

      res.render(path.join(__dirname, '../../src/views/pages/anak-asuh/anak-asuh.ejs'), { session: req.session, data: dataAnakAsuh });
   },
   PageAddAnakAsuh: async (req, res) => {
      res.render(path.join(__dirname, '../../src/views/pages/anak-asuh/tambah-anak-asuh.ejs'), { session: req.session });
   },
   AddAnakAsuh: async (req, res) => {
      const { userId } = req.session
      const { filename } = req.file
      console.log("LOG-REQ-SESSION", userId, req.session)
      const {
         namaLengkap,
         tempatLahir,
         tanggalLahir,
         gender,
         alamat,
         kelas,
         status,
         ayah,
         ibu,
         noHandphone,
         keterangan
      } = req.body
      console.log("LOG-REQ-BODY", req.body)

      await AnakAsuh.create({
         fullname: namaLengkap,
         kelamin: gender,
         tempat_lahir: tempatLahir,
         tanggal_lahir: moment(tanggalLahir).format("YYYY-MM-DD"),
         address: alamat,
         status: status,
         kelas: kelas,
         photo: filename,
         ayah: ayah,
         ibu: ibu,
         number_phone: noHandphone,
         keterangan: keterangan,
         id_admin: userId
      })

      res.redirect('/anak-asuh')
   },
   EditAnakAsuhPage: async (req, res) => {
      const { id } = req.params
      const data = await AnakAsuh.findOne({ where: { id: id } })
      const photo = data.photo ? `http://${config.url}/uploads/profile/${data.photo}` : null
      const dataAnak = {
         id: data.id,
         namaLengkap: data.fullname,
         kelamin: data.kelamin,
         tempatLahir: data.tempat_lahir,
         tanggalLahir: moment(data.tanggal_lahir).format("DD MMM YYYY"),
         address: data.address,
         status: data.status,
         kelas: data.kelas,
         photo: photo,
         umur: new Date().getFullYear() - new Date(data.tanggal_lahir).getFullYear(),
         ayah: data.ayah,
         ibu: data.ibu,
         noHandphone: data.number_phone,
         keterangan: data.keterangan,
      }
      console.log("LOG-REQ-PARAMS", id)
      console.log("LOG-REQ-req.session", req.session)
      res.render(path.join(__dirname, '../../src/views/pages/anak-asuh/edit-anak-asuh.ejs'), { session: req.session, data: dataAnak });
   },
   UpdateDataAnakAsuh: async (req, res) => {
      const { id } = req.params
      const { userId } = req.session

      console.log("LOG-REQ-SESSION", userId, req.session)
      const {
         namaLengkap,
         tempatLahir,
         tanggalLahir,
         gender,
         alamat,
         status,
         kelas,
         ayah,
         ibu,
         noHandphone,
         keterangan
      } = req.body
      console.log("LOG-REQ-BODY", req.body)


      const dataObject = {
         fullname: namaLengkap,
         kelamin: gender,
         tempat_lahir: tempatLahir,
         tanggal_lahir: moment(tanggalLahir).format("YYYY-MM-DD"),
         address: alamat,
         status: status,
         kelas: kelas,
         ayah: ayah,
         ibu: ibu,
         number_phone: noHandphone,
         keterangan: keterangan,
         id_admin: userId
      }
      if (req.file) {
         dataObject.photo = req.file.filename
      }

      await AnakAsuh.update(dataObject, { where: { id: id } })

      res.redirect('/anak-asuh')
   },
   DeleteAnakAsuh: async (req, res) => {
      const { id } = req.params
      console.log("LOG-REQ-PARAMS", id)
      await AnakAsuh.destroy({ where: { id: id } })
      res.redirect('/anak-asuh')
   }
}
const { AnakAsuh, Wali } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia, GetDate } = require("../utils/times/timezone");
const user = require('./user');
const path = require('path');
const moment = require("moment");

module.exports = {
   AddAnakAsuh: async (req, res) => {
      const { userId } = req.session
      console.log("LOG-REQ-SESSION", userId, req.session)
      const {
         namaLengkapWali,
         alamatWali,
         umurWali,
         noTelpWali,
         photoWali,
         namaLengkap,
         tempatLahir,
         tanggalLahir,
         gender,
         alamat,
         status,
         hubungan,
         photo,
         tanggalMasuk,
         tanggalKeluar,
         tanggalWafat,
         ayah,
         ibu,
         noHandphone,
         keterangan
      } = req.body
      console.log("LOG-REQ-BODY", req.body)
      const wali = await Wali.create({
         fullname: namaLengkapWali,
         address: alamatWali,
         umur: umurWali,
         number_phone: noTelpWali,
         photo: photoWali
      })

      if (!wali) {
         return Response(res, 400, false, 'Failed to add data wali')
      }

      console.log("LOG-WALI", wali)
      console.log("LOG-DATEL", moment(tanggalLahir).format("YYYY-MM-DD"))
      const anakAsuh = await AnakAsuh.create({
         fullname: namaLengkap,
         kelamin: gender,
         tempat_lahir: tempatLahir,
         tanggal_lahir: moment(tanggalLahir).format("YYYY-MM-DD"),
         alamat: alamat,
         status: status,
         hubungan: hubungan,
         photo: photo,
         tanggal_masuk: moment(tanggalMasuk).format("YYYY-MM-DD"),
         tanggal_keluar: moment(tanggalKeluar).format("YYYY-MM-DD"),
         ayah: ayah,
         ibu: ibu,
         tanggal_wafat: moment(tanggalWafat).format("YYYY-MM-DD"),
         number_phone: noHandphone,
         keterangan: keterangan,
         id_wali: wali.id,
         id_admin: userId
      })

      // res.render(path.join(__dirname, '../../src/views/pages/management-user/administrator.ejs'), { data: datas, generatePassword: generatePassword });
   },
}
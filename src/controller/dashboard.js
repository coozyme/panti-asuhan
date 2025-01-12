const path = require("path");
const { AnakAsuh, Donasi, Donatur } = require("../models");
const { where, Sequelize } = require("sequelize");
const { formatRupiah } = require("../utils/currency/format");
const { formatDateTime } = require("../utils/times/datetime");


module.exports = {
   Dashboard: async (req, res) => {

      console.log('REQ-SESSION-DASH', req.session.userType)
      const totalAnakAsuh = await AnakAsuh.count()
      const donasiVerified = await Donasi.count({
         status_verifikasi: "VERIFIED"
      })

      const donasiBelumVerified = await Donasi.count({
         where: {
            status_verifikasi: 'PENDING'
         }
      })
      console.log('donasiBelumVerified', donasiBelumVerified)


      const resultTotalDonasi = await Donasi.findOne({
         attributes: [[Sequelize.fn('SUM', Sequelize.col('jumlah')), 'total_jumlah']],
         where: {
            status_verifikasi: 'VERIFIED'
         }
      });


      const dataUnalidationDonasi = await Donasi.findAll({
         where: {
            status_verifikasi: 'PENDING',
            tanggal_verifikasi: null
         },
         order: [['tanggal_verifikasi', 'DESC']]
      })

      const mapData = dataUnalidationDonasi.map((data) => {
         return {
            id: data.id,
            donatur: data.donatur,
            jumlah: formatRupiah(data.jumlah),
            tanggal_submit: formatDateTime(new Date(data.tanggal_submit)),
            status_verifikasi: data.status_verifikasi,
         }
      })

      // const aggreateActivity = []

      const logActivity = await Donatur.findAll({
         where: {
            tanggal_logout: {
               [Sequelize.Op.ne]: null
            },
            tanggal_login: {
               [Sequelize.Op.ne]: null
            },
            status: 'VERIFIED'
         },
         order: [
            ['tanggal_login', 'DESC'],
            ['tanggal_logout', 'DESC']],
         limit: 5
      })

      const donasiActivity = await Donasi.findAll({
         order: [
            ['tanggal_submit', 'DESC'],
            ['tanggal_verifikasi', 'DESC']],
         limit: 5
      })

      const aggreateActivity = []

      const mapLogActivity = logActivity.map((data) => {
         console.log('data11', data)
         const obj = {
            type: 'login',
            id: data.id,
            nama: data.fullname,
            email: data.email,
            tanggal_login: formatDateTime(new Date(data.tanggal_login)),
            tanggal_logout: formatDateTime(new Date(data.tanggal_logout)),
         }
         aggreateActivity.push(obj)
      }
      )

      const mapDonasiActivity = donasiActivity.map((data) => {
         const obj = {
            type: 'donasi',
            id: data.id,
            donatur: data.donatur,
            jumlah: formatRupiah(data.jumlah),
            tanggal_submit: formatDateTime(new Date(data.tanggal_submit)),
            tanggal_verifikasi: formatDateTime(new Date(data.tanggal_verifikasi)),
            status_verifikasi: data.status_verifikasi,
         }
         aggreateActivity.push(obj)
      }
      )
      const dataCount = {
         totalAnakAsuh: totalAnakAsuh,
         donasiVerified: donasiVerified,
         donasiBelumVerified: donasiBelumVerified,
         totalDonasi: formatRupiah(resultTotalDonasi.get('total_jumlah')),
         dataUnalidationDonasi: mapData
      }

      res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'), { session: req.session, log: aggreateActivity, ...dataCount });
   }
}
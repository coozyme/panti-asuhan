const path = require("path");
const { AnakAsuh, Donasi } = require("../models");
const { where, Sequelize } = require("sequelize");
const { formatRupiah } = require("../utils/currency/format");
const { formatDateTime } = require("../utils/times/datetime");


module.exports = {
   Dashboard: async (req, res) => {

      // const anakYatim = await AnakAsuh.count({
      //    where: {
      //       status: "YATIM"
      //    }
      // })

      // const anakPiatu = await AnakAsuh.count({
      //    where: {
      //       status: "PIATU"
      //    }
      // })
      // const anakYatimPiatu = await AnakAsuh.count({
      //    where: {
      //       status: "YATIM PIATU"
      //    }
      // })

      // const anakDhuafa = await AnakAsuh.count({
      //    where: {
      //       status: "DHUAFA"
      //    }
      // })
      console.log('REQ-SESSION-DASH', req.session.userType)
      const totalAnakAsuh = await AnakAsuh.count()
      const donasiVerified = await Donasi.count({
         status_verifikasi: "VERIFIED"
      })

      const donasiBelumVerified = await Donasi.count({
         status_verifikasi: 'PENDING'
      })
      console.log('donasiBelumVerified', donasiBelumVerified)

      const totalDonasi = await Donasi.sum('jumlah', {
         where: {
            status_verifikasi: 'VERIFIED'
         }
      });

      const result = await Donasi.findOne({
         attributes: [[Sequelize.fn('SUM', Sequelize.col('jumlah')), 'total_jumlah']],
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



      const dataCount = {
         // yatim: anakYatim,
         // piatu: anakPiatu,
         // yatimPiatu: anakYatimPiatu,
         // dhuafa: anakDhuafa,
         totalAnakAsuh: totalAnakAsuh,
         donasiVerified: donasiVerified,
         donasiBelumVerified: donasiBelumVerified,
         totalDonasi: formatRupiah(result.get('total_jumlah')),
         dataUnalidationDonasi: mapData
      }

      res.render(path.join(__dirname, '../../src/views/pages/dashboard/dashboard.ejs'), { session: req.session, ...dataCount });
   }
}
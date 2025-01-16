const path = require("path");
const { CampaignDonasi, Kegiatan, Galeries } = require("../models");
const { PercentageCalcuate, PercentageCollected } = require("../utils/calculation/calculation");
const { formatRupiah } = require("../utils/currency/format");
const config = require("../config/config");
const moment = require("moment");


module.exports = {
   Galeri: async (req, res) => {
      console.log("log-galeri")
      const id = req.params.id;

      const data = await Kegiatan.findOne({
         where: {
            id: id
         }
      })


      // await Promise.all(data.map(async (d) => {
      const photo = await Galeries.findAll({
         where: {
            id_kegiatan: id
         }
      })

      let photos = []
      photo.forEach((p) => {
         photos.push(`http://${config.url}/uploads/galeri/${p.image}`)
      })

      const datas = {
         id: id,
         thumbnail: `http://${config.url}/uploads/galeri/${data.thumbnail}`,
         kegiatan: data.kegiatan,
         keterangan: data.keterangan,
         tanggal: moment(data.tanggal).format("DD MMMM YYYY"),
         photos: photos
      }

      // }
      // ))



      res.render(path.join(__dirname, '../../src/views/pages/landing-page/galeri.ejs'), { galeri: datas });
   }
}
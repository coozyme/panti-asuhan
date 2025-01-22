const path = require("path");
const { CampaignDonasi, Kegiatan, Galeries, Donatur, AnakAsuh, Donasi } = require("../models");
const { PercentageCalcuate, PercentageCollected } = require("../utils/calculation/calculation");
const { formatRupiah } = require("../utils/currency/format");
const config = require("../config/config");
const { where } = require("sequelize");


module.exports = {
   LandingPage: async (req, res) => {
      let mainCampaignData = null;
      const mainCampaign = await CampaignDonasi.findOne({
         where: {
            status: 'PUBLISH',
            main_campaign: true
         }
      })

      if (mainCampaign) {
         const photoMainCampaign = mainCampaign.photo ? `http://${config.url}/uploads/campaign/${mainCampaign.photo}` : null

         mainCampaignData = {
            id: mainCampaign.id,
            judul: mainCampaign.judul,
            deskripsi: mainCampaign.deskripsi,
            targetDonasi: formatRupiah(mainCampaign.target_donasi),
            terkumpul: formatRupiah(mainCampaign.terkumpul),
            tanggalMulai: mainCampaign.tanggal_mulai,
            tanggalSelesai: mainCampaign.tanggal_selesai,
            photo: photoMainCampaign,
            status: mainCampaign.status,
            mainCampaign: mainCampaign.main_campaign,
            percentage: `${PercentageCollected(mainCampaign.terkumpul, mainCampaign.target_donasi)}%`,
         }
         console.log('mainCampaignData', mainCampaignData)
      }

      const campaignList = await CampaignDonasi.findAll({
         where: {
            status: 'PUBLISH',
            main_campaign: false
         }
      })


      const campaignData = campaignList.map(item => {
         return {
            id: item.id,
            judul: item.judul,
            deskripsi: item.deskripsi,
            targetDonasi: formatRupiah(item.target_donasi),
            terkumpul: formatRupiah(item.terkumpul),
            tanggalMulai: item.tanggal_mulai,
            tanggalSelesai: item.tanggal_selesai,
            photo: item.photo ? `http://${config.url}/uploads/campaign/${item.photo}` : null,
            status: item.status,
            mainCampaign: item.main_campaign,
            percentage: `${PercentageCollected(item.terkumpul, item.target_donasi)}%`,
         }
      })

      const listOfKegiatan = []
      const kegiatan = await Kegiatan.findAll()

      kegiatan.forEach(item => {
         const urlThumbnail = `http://${config.url}/uploads/galeri/${item.thumbnail}`
         console.log('URL THUMBNAIL', urlThumbnail)
         listOfKegiatan.push({
            id: item.id,
            kegiatan: item.kegiatan,
            keterangan: item.keterangan,
            tanggal: item.tanggal,
            tanggalUpload: item.tanggal_upload,
            thumbnail: item.thumbnail ? urlThumbnail : null,
         })
      })

      const totalAnakAsuh = await AnakAsuh.count()
      const totalDonatur = await Donasi.count()
      const totalCampaign = await CampaignDonasi.count({
         where: {
            status: 'UNPUBLISH'
         }
      })

      const countData = {
         totalAnakAsuh: totalAnakAsuh,
         totalDonatur: totalDonatur,
         totalCampaign: totalCampaign
      }
      // console.log('LEGIATAK', kegiatan)

      res.render(path.join(__dirname, '../../src/views/pages/landing-page/landing-page.ejs'), { mainCampaignData: mainCampaignData, campaignData: campaignData, listOfKegiatan: listOfKegiatan, countData: countData });
   }
}
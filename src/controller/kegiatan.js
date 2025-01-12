const { Kegiatan, Galeries } = require("../models");
const path = require('path');
const moment = require("moment");
const config = require("../config/config");

module.exports = {
   GetPage: async (req, res) => {
      const data = await Kegiatan.findAll({})

      const datas = await Promise.all(data.map(async (d) => {
         const photo = await Galeries.findAll({
            where: {
               id_kegiatan: d.id
            }
         })

         let photos = []
         photo.forEach((p) => {
            console.log("LOG-PJO-photo", p.image);
            photos.push(`http://${config.url}/uploads/galeri/${p.image}`)
         })

         return {
            id: d.id,
            thumbnail: `http://${config.url}/uploads/galeri/${d.thumbnail}`,
            kegiatan: d.kegiatan,
            keterangan: d.keterangan,
            tanggal: moment(d.tanggal).format("DD MMMM YYYY"),
            photos: photos
         }

         console.log("LOG-PJO-obj", obj);
         // datas.push(obj)
      }))
      console.log("LOG-PJO-datas", datas);


      res.render(path.join(__dirname, '../../src/views/pages/kegiatan/kegiatan.ejs'), { session: req.session, data: datas });
   },
   GetPageTambahKegiatan: async (req, res) => {
      res.render(path.join(__dirname, '../../src/views/pages/kegiatan/tambah-kegiatan.ejs'), { session: req.session });
   },
   AddKegiatan: async (req, res) => {
      const userId = req.session.userId
      const { kegiatan, deksripsi, tanggalKegiatan } = req.body;
      console.log("LOG-PJO", req.files);
      console.log("LOG-PJO-body", req.body);

      const files = req.files

      let thumbnail = ""
      let photos = []

      files.map((file, i) => {
         if (i === 0) {
            thumbnail = file.filename
         } else {
            photos.push(file.filename)
         }
      })

      try {
         const data = await Kegiatan.create({
            thumbnail: thumbnail,
            kegiatan: kegiatan,
            keterangan: deksripsi,
            tanggal: tanggalKegiatan,
            id_admin: userId
         });


         if (photos.length > 0) {
            await Galeries.bulkCreate(photos.map((photo) => {
               return {
                  id_kegiatan: data.id,
                  image: photo
               }
            }))
         }

         res.redirect("/kegiatan")
      } catch (error) {
         return res.status(400).json({
            status: "error",
            message: error.message
         })
      }

   },
   GetPageEdit: async (req, res) => {
      const { id } = req.params;
      const datas = await Kegiatan.findOne({
         where: {
            id: id
         }
      })

      const data = {
         id: datas.id,
         thumbnail: `http://${config.url}/uploads/galeri/${datas.thumbnail}`,
         kegiatan: datas.kegiatan,
         keterangan: datas.keterangan,
         tanggal: moment(datas.tanggal).format("DD MMM YYYY")
      }

      const photo = await Galeries.findAll({
         where: {
            id_kegiatan: id
         }
      })

      let photos = []
      photo.forEach((p) => {
         photos.push(`http://${config.url}/uploads/galeri/${p.image}`)
      })

      res.render(path.join(__dirname, '../../src/views/pages/kegiatan/ubah-kegiatan.ejs'), { session: req.session, data: data, photos: photos });
   },
   DeleteKegiatan: async (req, res) => {
      const { id } = req.params;

      try {
         await Galeries.destroy({
            where: {
               id_kegiatan: id
            }
         })

         await Kegiatan.destroy({
            where: {
               id: id
            }
         })


         res.redirect("/kegiatan")
      } catch (error) {
         console.log("LOG-DeleteKegiatan-ERR", error);
         return res.status(400).json({
            status: "error",
            message: error.message
         })
      }
   },
   UpdateKegiatan: async (req, res) => {
      const userId = req.session.userId
      const { id } = req.params;
      const { kegiatan, deskripsi, tanggalKegiatan } = req.body;
      console.log("LOG-UpdateKegiatan", req.body);

      let thumbnail = ""
      let photos = []

      if (req.files) {
         const files = req.files
         files.map((file, i) => {
            if (i === 0) {
               thumbnail = file.filename
            } else {
               photos.push(file.filename)
            }
         })
      }

      try {

         const objUpdate = {
            kegiatan: kegiatan,
            keterangan: deskripsi,
            tanggal: tanggalKegiatan,
            id_admin: userId
         }


         if (thumbnail !== "") {
            objUpdate.thumbnail = thumbnail
         }


         await Kegiatan.update(objUpdate, {
            where: {
               id: id
            }
         });

         if (photos.length > 0) {
            await Galeries.bulkCreate(photos.map((photo) => {
               return {
                  id_kegiatan: id,
                  image: photo
               }
            }))
         }

         res.redirect("/kegiatan")
      } catch (error) {
         return res.status(400).json({
            status: "error",
            message: error.message
         })
      }
   }
}
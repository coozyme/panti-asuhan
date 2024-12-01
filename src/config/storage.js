var multer = require('multer')
const path = require('path')

const storage = (folderName) => multer.diskStorage({
   destination: function (req, file, cb) {
      // console.log("LOG-destination", req, file)
      cb(null, path.join(__dirname, '../../uploads/' + folderName))
   },
   filename: function (req, file, cb) {
      console.log("FILE", file.mimetype, file.originalname)
      // take the original name and replace all spaces with _
      const filename = file.originalname.split(' ').join('_')
      cb(null, Date.now() + '_' + filename)
   }
})
const uploadFile = (folderName) => multer({ storage: storage(folderName) })

module.exports = uploadFile
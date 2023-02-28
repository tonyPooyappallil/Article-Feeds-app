const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1e9)
    cb(null, uniquePrefix + '1R580Hj4j2hinfoTonPoo' + '_' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    filesize: 1024 * 1024 * 5
  }
})

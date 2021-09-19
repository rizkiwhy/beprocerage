const multer = require('multer')
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname)
    }
})
const imageTypeFiles = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"]
const imageFilter = (req, file, cb) => {
    if (imageTypeFiles.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

exports.uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter})
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // By default, multer removes file extensions so let's add them back
    }
});
module.exports.storage = storage
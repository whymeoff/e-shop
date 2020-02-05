const multer = require('multer')
const upload = multer({ 
    limits: {
        fileSize: 5000000
    } 
})
module.exports = upload
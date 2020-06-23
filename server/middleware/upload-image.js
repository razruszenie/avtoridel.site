const multer = require('multer')
const uuidv4 = require('uuid/v4')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path_name = './static/uploads/';
        cb(null,  path_name);
    },
    filename: function (req, file, cb) {
        let originalname = file.originalname;
        const extension = originalname.split(".");
        const new_name = uuidv4();
        filename = new_name+ '.' + extension[extension.length-1];
        cb(null, filename);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype){
        cb(null, true)
    } else{
        cb(null, false)
    }
}

module.exports = multer({
    storage, fileFilter, limits: {fileSize: 1024*1024*10}
})
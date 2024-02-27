
const multer = require('multer');

function productimg() {

    // Set up Multer storage and file handling
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/images/products'); // specify the destination folder for uploaded files
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname); // create a unique filename
        }
    });
    
    const upload = multer({ storage: storage });
    return upload;
}

function bannerimg(){
       // Set up Multer storage and file handling
       const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/images/banner'); // specify the destination folder for uploaded files
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname); // create a unique filename
        }
    });
    
    const upload = multer({ storage: storage });
    return upload;
}


module.exports = {
    productimg,
    bannerimg
}
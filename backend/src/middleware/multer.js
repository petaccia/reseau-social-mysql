const multer = require("multer");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png",
  "image/svg": "svg",
}

//La destination du fichier (répertoire) et générer un nom de fichier unique
const storage = multer.diskStorage({
  //Destination du stockage du fichier
  destination : (req, file, callback) => {
    callback(null, "images");
  }, 
  filename: (req, file, callback) => {
    //supprimer les espace dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPE[file.mimetype];
    callback(null, name + "_" + Date.now() + extension);
  }
})





module.exports = multer({storage}).single("image");
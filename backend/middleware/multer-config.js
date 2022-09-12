const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// Configuration du chemin et nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Remplace les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);  //Résout l'extension avec la const MIME_TYPES
  }
});

module.exports = multer({storage: storage}).single('image');
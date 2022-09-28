const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// Configuration du chemin et nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({

//on enregistre les fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  //on utilise le nom d'origine du fichier puis on remplace les espaces par des underscores et on ajoute un timestamp
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Remplace les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);  //Résout l'extension avec la const MIME_TYPES
  }
});

//On exporte l'élément
module.exports = multer({storage: storage}).single('image');
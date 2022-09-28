//Variables
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
//Routes

//toutes les routes nécessitent une vérification de l'id extrait du token

//Les routes qui gèrent les images utilisent la configuration multer
router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;
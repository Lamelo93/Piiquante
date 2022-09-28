//Variables
const mongoose = require('mongoose');
//Schema d'une sauce

//La methode schema permet de créer un schéma des données

//L'ID de la sauce sera généré par mongoose
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: []},
  usersDisliked: { type: Array, default: [] },
});

//La méthode model transforme le schéma en modèle utilisable
module.exports = mongoose.model('Sauce', sauceSchema);
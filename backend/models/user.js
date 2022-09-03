//Variables
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//Schema utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //Chaque email utilisé pour créer un compte doit être unique

module.exports = mongoose.model('User', userSchema);
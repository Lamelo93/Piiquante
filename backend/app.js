//Variables
const express = require("express");

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const sauceRoutes = require('./routes/sauceRoutes');
const userRoutes = require('./routes/user');
const path = require('path');
const MONGOOSE_CONNECT = process.env.MONGOOSE_CONNECT;
const app = express();

//Connexion a la base de données
mongoose
  .connect(
    MONGOOSE_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Toutes les requêtes utilisent express
app.use(express.json());

//Headers utilisés pour toutes les requêtes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); //Gestion des images via le sous dossier /images

module.exports = app;
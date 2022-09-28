//Variables

// Algorithme pour chiffrer et créer un hash des mots de passe utilisateur
const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

//Inscription sur le site

//La fonction est asynchrone et renvoie une promise qui contient le hash généré
exports.signup = (req, res, next) => {
  // Le mot de passe est hashé 10 fois par sécurité
    bcrypt.hash(req.body.password, 10)

    //L'utilisateur est créé et enregistré dans la base de données
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ message: 'Échec de création utilisateur' }));
      })
      .catch(error => res.status(500).json({ error }));
  };
//Connexion à un compte existant
  exports.login = (req, res, next) => {

    //On verifie que l'email existe bien dans la base de données
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            //bcrypt compare le mot de passe au hash enregistré en base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        //La fonction sign de jwt chiffre un nouveau token aléatoire qui contient l'id utilisateur
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
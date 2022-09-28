//Variables
const jwt = require('jsonwebtoken');
//Authentification avec utilisation d'un token 
module.exports = (req, res, next) => {
   try {
    //Le token est extrait du header authorization (sans la mention "bearer")
       const token = req.headers.authorization.split(' ')[1];
       //La fonction verify de jwt décode le token
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       //L'id utilisateur est extrait du token et ajouté a la requète en tant que auth
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
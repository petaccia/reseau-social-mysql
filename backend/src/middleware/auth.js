//Importation 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// exportation de la fonction du middleware
const token = async (req, res, next) => {
  // console.log("--------->req");
  // console.log(req);
  
  try{
    // Récupérer le token dans le header authorization : bearer token
    const token = req.headers.authorization.split(" ")[1];
    // Décoder le token
    const decodedToken = jwt.verify(token, `${process.env.DB_JWT_SECRET}`);
    // console.log(decodedToken);

    userIdParamsUrl = req.originalUrl.split("=")[1];
    // console.log("---------------userIdParamsUrl------------");
    // console.log(userIdParamsUrl);
    // Récupérer l'id du token
    const userIdDecodedToken = decodedToken.id;
    // console.log(userIdDecodedToken);
    
    // Récupérer l'userId qu'il y a dans l'url (query params ou body) ou les params de la route
    // const userId = req.body.id || req.query.userId || req.params.userId;

    // Vérifier que l'userId dans le token correspond à l'userId dans l'url ou les params de la route
    if (userIdParamsUrl == userIdDecodedToken) {
      // console.log("----------------je passe au middleware suivant------------");
      next();
    } else {
      // console.log("--------req dans le else");
      // console.log(req );
      throw "Identification de l'utilisateur échouée";
    }
  } catch (error) {
    res.status(401).json({ message: "Echec de l'authentification", error });
  }
};

module.exports = token;

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();



// middleware pour parser les Cookies
const parseCookies = cookieParser;



// exportation de la fonction du middleware
const token = async (req, res, next) => {
  try{
    // Récupérer le token depuis le cookie
    const token = req.cookies.token;
    
    // Vérifier si le token existe
    if (!token) {
      throw "Pas de token trouvé dans le cookie";
    }

    // Décoder le token
    const decodedToken = jwt.verify(token, `${process.env.DB_JWT_SECRET}`);

    // Récupérer l'id du token
    const userIdDecodedToken = decodedToken.id;
    
    // Récupérer l'userId qu'il y a dans l'url (query params ou body) ou les params de la route
    userIdParamsUrl = req.originalUrl.split("=")[1];

    // Vérifier que l'userId dans le token correspond à l'userId dans l'url ou les params de la route
    if (userIdParamsUrl == userIdDecodedToken) {
      next();
    } else {
      throw "Identification de l'utilisateur échouée";
    }
  } catch (error) {
    res.status(401).json({ message: "Echec de l'authentification", error });
  }
};



module.exports = {token, parseCookies};

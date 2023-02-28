//Importation 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// exportation de la fonction du middleware
const token = async (req,res, next) => {
  
  try{
    // console.log(req.headers.authorization);
    // Récupérer le token dans le header autorisation : bearer token
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    
    // Décoder le token
    const decodedToken = jwt.verify(token, `${process.env.DB_JWT_SECRET}`);
    console.log(decodedToken);
    

    
    // Récupérer l'userId qu'il y a dans le token dechiffré et le comparer avec l'user id en clair
    const userId = req.body.id || req.query.user.id || req.params.userId;

    if (userId !== req.body.id) {
      throw "Identification de l'utilisateur échouée";
    }
          // Authentification réussie
    next();
  } catch (error) {
    res.status(401).json({ message: "Echec de l'authentification", error });
  }
};

   


module.exports = token;
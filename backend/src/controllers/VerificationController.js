const models = require('../models');


//Créer une nouvelle vérification d'information
const createVerificationInfo = async (req, res) => {
  try{
    const verificationInfos = req.body;
    const [result] = await models.verification_info.insert(verificationInfos);
    res.status(201).json({ message: "Vérification d\'informations créée avec succès", result });
  } catch (err) {
    console.error (err);
    res.sendStatus(500); 
  }
};


// Obtenir une vérification d'information par Id
const getVerificationInfoById = async (req,res) => {
  try{
    const vericationInfoId = req.params.id;
    const verificationInfos = await models.verification_info.getById(vericationInfoId);
    res.json(verificationInfos);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Mettre à jour une vérification d'information par Id
const updateVerificationInfoById = async (req, res) => {
  try {
    const verificationInfoId = req.params.id;
    const updatedVerificationInfo = req.body;
    await models.verification_info.updateById(updatedVerificationInfo, verificationInfoId);
    res.json({ message: "Vérification d\'informations mise à jour avec succès"});
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    };

module.exports = {
  createVerificationInfo,
  getVerificationInfoById,
  updateVerificationInfoById,
}



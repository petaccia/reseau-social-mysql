# reseau-social-mysql

# git clone reseau-social-mysql dans le terminal bash
# taper npm init -y pour initialiser votre projet


Créer un dossier backend 
Dans le dossier backend créer plusieurs dossiers et fichiers : 

# dossiers
-public
-src
# fichiers
-.env (pour entrer vos variable d'environnement)
-.env.sample
-database.js
-index.js
-migrate.js


# pour lançer le serveur 
npm i --save-dev nodemon pour l'installer dans la dépendance dev
et dans le package.json mettre "dev": "nodemon index.js" puis dans le terminal taper npm run dev
# télécharger dotenv en tapant dans le terminal 
cd backend pour entrer dans le dossier backend
npm i dotenv

ensuite dans le fichier .gitignore mettre :
- .env
- node_modules

# créer une connection à la base de donnée
créer la connection dans le fichier migrate et index.js.

# créer des fichiers app et router dans src

# télécharger express et cors
taper dans le terminal npm i express cors,
importer express dans app et router.



----------------FRONTEND----------------

# Créer un dossier frontend

# Création d'un projet react
Dans frontend taper: npx create-react-app
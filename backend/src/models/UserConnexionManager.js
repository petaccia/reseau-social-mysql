const AbstractManager = require("./AbstractManager");

class UserConnexionManager extends AbstractManager {
  constructor() {
    super({ table: "connexion" });
  }

  insert(connexion) {
    // console.log(connexion);
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, age, email, password) values (?, ?, ?, ?, ?)`,
      [
        connexion.firstname,
        connexion.lastname,
        connexion.age,
        connexion.email,
        connexion.password
      ]
    );
  }

  findByEmail(email) {
    return this.connection.query(
      "select * from connexion where email = ?",
      [email]
    );
  }

   
  
 
}

module.exports = UserConnexionManager;

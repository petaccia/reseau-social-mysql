const AbstractManager = require("./AbstractManager");

class UserConnexionManager extends AbstractManager {
  constructor() {
    super({ table: "connexion" });
  }

  insert(connexion) {
    return this.connection.query(
      `insert into ${this.table} (email, password) values (?, ?)`,
      [connexion.email, connexion.password]
    );
  }

 
}

module.exports = UserConnexionManager;

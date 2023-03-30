const AbstractManager = require("./AbstractManager");

class ConnexionManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    // console.log(connexion);
    return this.connection.query(
      `insert into ${this.table} (username, name, email, password) values (?, ?, ?, ?)`,
      [
        user.username,
        user.name,
        user.email, 
        user.password,
      ]
    );
  }

  findByEmail(email) {
    return this.connection.query(
      "select * from users where email = ?",
      [email]
    );
  }

   
  
 
}

module.exports = ConnexionManager;

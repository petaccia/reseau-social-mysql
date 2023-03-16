const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  find(userId) {
    return this.connection.query(`select * from  ${this.table} where connexion_id = ?`, [
      userId,
    ]);
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(users) {
    return this.connection.query(
      `insert into ${this.table} (nom, prenom, age, photoProfilUrl) values (?, ?, ?, ?)`,
      [
        users.nom,
        users.prenom,
        users.age,
        users.photoProfilUrl
      ]
    );
  }

  update(users, userId) {
    return this.connection.query(
      `update ${this.table} set ? where userId = ?`,
    [
      users,
      userId
    ]
    );
  }

  delete(users, userId) {
    return this.connection.query(`delete from ${this.table} where userId = ?`, [
      users,
      userId
    ]);
  }


}

module.exports = UsersManager;

const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  find(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
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

  update(users, id) {
    return this.connection.query(
      `update ${this.table} set ? where id = ?`,
    [
      users,
      id
    ]
    );
  }

  delete(users, id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      users,
      id
    ]);
  }


}

module.exports = UsersManager;

const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (username, email, password, firstName, lastName, dateOfBirth, profilPicture, familyId) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.username,
        user.email,
        user.password,
        user.firstName,
        user.lastName,
        user.dateOfBirth,
        user.profilPicture,
        user.familyId
      ]
    );
  }

  update(user, id) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      user,
      id,
    ]);
  }

  getByUsername(username) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE username = ?`, [username]);
  }
}

module.exports = userManager;

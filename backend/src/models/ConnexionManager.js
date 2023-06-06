const AbstractManager = require("./AbstractManager");

class ConnectionManager extends AbstractManager {
  constructor() {
    super({ table: "connection" });
  }

  insert(connection) {
    return this.connection.query(
      `INSERT INTO ${this.table} (email, password, familyId) VALUES (?, ?, ?)`,
      [connection.email, connection.password, connection.familyId]
    );
  }

  findByEmail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  getByFamilyId(familyId) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE familyId = ?`,
      [familyId]
    );
  }

  update(connection, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      connection,
      id,
    ]);
  }

  delete(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }
}

module.exports = ConnectionManager;

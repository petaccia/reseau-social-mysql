const AbstractManager = require("./AbstractManager");

class LikeManager extends AbstractManager {
  constructor() {
    super({ table: "likes" });
  }

  insert(like) {
    return this.connection.query(
      `INSERT INTO ${this.table} (userId, postId) VALUES (?, ?)`,
      [like.userId, like.postId]
    );
  }

  getLike(userId, postId) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE userId = ? AND postId = ?`,
      [userId, postId]
    );
  }

  getById(id) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  updateById(likeId,updatedData) {
    const {userId, postId} = updatedData;
    return this.connection.query(`UPDATE ${this.table} SET userId = ?, postId = ? WHERE id = ?`, [
      userId, postId, likeId
      
    ]);
  }

  deleteById(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }
}

module.exports = LikeManager;

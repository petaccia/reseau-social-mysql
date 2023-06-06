const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  insert(comment) {
    return this.connection.query(
      `INSERT INTO ${this.table} (content, createdAt, userId, postId) VALUES (?, ?, ?, ?)`,
      [comment.content, comment.createdAt, comment.userId, comment.postId]
    );
  }

  getById(id) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }

  updateById(comment, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [comment, id]);
  }

  deleteById(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CommentManager;

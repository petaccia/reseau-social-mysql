const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "posts" });
  }

  insert(post) {
    return this.connection.query(
      `INSERT INTO ${this.table} (content, createdAt, userId ) VALUES (?, ?, ?)`,
      [post.content, post.createdAt, post.userId]
    );
  }

  getById(id) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }

  updateById(post, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [post, id]);
  }

  deleteById(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = PostManager;

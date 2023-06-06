const AbstractManager = require("./AbstractManager");

class VerificationInfoManager extends AbstractManager {
  constructor() {
    super({ table: "verification_info" });
  }

  insert(verificationInfo) {
    return this.connection.query(
      `INSERT INTO ${this.table} (verification_code, verification_status, dateSubmitted, dateApproved, dateRejected, rejectedReason, additionalInfo, isVerified, verifiedBy, familyId, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        verificationInfo.verification_code,
        verificationInfo.verification_status,
        verificationInfo.dateSubmitted,
        verificationInfo.dateApproved,
        verificationInfo.dateRejected,
        verificationInfo.rejectedReason,
        verificationInfo.additionalInfo,
        verificationInfo.isVerified,
        verificationInfo.verifiedBy,
        verificationInfo.familyId,
        verificationInfo.userId,
      ]
    );
  }

getById(id) {
  return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
}

  updateById(verificationInfo, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      verificationInfo,
      id,
    ]);
  }
}

module.exports = VerificationInfoManager;

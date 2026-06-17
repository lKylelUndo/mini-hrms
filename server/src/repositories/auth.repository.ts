import { mysql } from "../lib/mysql";

export class AuthRepository {
  async findByEmail(email: string) {
    return await mysql.query(`SELECT * FROM users WHERE email = ?`, [email]);
  }
}

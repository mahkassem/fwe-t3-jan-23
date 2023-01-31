import db from '../providers/database.provider'

export interface User {
  id?: number
  name: string
  email: string
  password?: string
  token?: string
}

export class UserEntity {
  static table = 'users'

  static async findOne(id: number): Promise<User> {
    const queryText = `SELECT * FROM ${this.table} WHERE id = $1`
    const { rows } = await db.query(queryText, [id])
    return rows[0]
  }

  static async create(user: User): Promise<User> {
    const { name, email, password } = user
    const queryText = `INSERT INTO ${this.table} (name, email, password) VALUES ($1, $2, $3) RETURNING *`
    const { rows } = await db.query(queryText, [name, email, password])
    return rows[0]
  }

  // special method for login
  static async findByEmail(email: string): Promise<User> {
    const queryText = `SELECT * FROM ${this.table} WHERE email = $1`
    const { rows } = await db.query(queryText, [email])
    return rows[0]
  }
}

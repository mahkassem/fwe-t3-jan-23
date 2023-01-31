import { UserEntity, User } from '../entities/users.entity'
import config from '../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    const user = await UserEntity.findByEmail(email)

    if (!user) throw new Error('User not found')

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      password + String(config.app.secret),
      String(user.password),
    )

    if (!isPasswordMatch) throw new Error('Password is incorrect')

    // generate token
    user.token = this.generateToken(user)

    delete user.password

    return user
  }

  static async register(user: User): Promise<User> {
    // hash password
    user.password = await bcrypt.hash(
      user.password + String(config.app.secret),
      10,
    )

    // create user
    const newUser = await UserEntity.create(user)

    // generate token
    newUser.token = this.generateToken(newUser)

    delete user.password

    return newUser
  }

  static generateToken(user: User): string {
    const payload = {
      sub: user.id,
      name: user.name,
    }

    const token = jwt.sign(payload, String(config.app.secret), {
      expiresIn: '1d',
    })

    return token
  }
}

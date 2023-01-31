import { Request, Response } from 'express'
import { AuthService } from '../services/auth.services'

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const user = await AuthService.login(email, password)
    return res.json({ message: 'Login was successfull!', user })
  }

  async register(req: Request, res: Response): Promise<Response> {
    const user = await AuthService.register(req.body)
    return res.json({ message: 'Registeration was successfull!', user })
  }
}

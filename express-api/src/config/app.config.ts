import dotenv from 'dotenv'
dotenv.config()

export default {
  env: process.env.ENV || 'dev',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET,
}

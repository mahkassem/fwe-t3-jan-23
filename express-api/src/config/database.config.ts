import dotenv from 'dotenv'
import appConfig from './app.config'
dotenv.config()

const ENV = appConfig.env

export default {
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  name: ENV === 'test' ? process.env.PG_DATABASE_TEST : process.env.PG_DATABASE,
}

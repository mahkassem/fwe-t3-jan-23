import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes'
import { appConfig } from './config'

const app = express()
const port = appConfig.port // default port to listen

// Middlewares
app.use(cors(), helmet(), json())

// Routes
app.use('/api', router)

// Start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

export default app

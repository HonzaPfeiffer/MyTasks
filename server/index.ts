import express, { Express, Request, Response } from 'express'
import TasksController from './controllers/tasks-controller'
import Middleware from './middleware/middleware'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.APP_PORT

Middleware(app)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use('/api/tasks', TasksController)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

console.log('App started')

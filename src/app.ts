import express, { Express } from 'express'

// the express application
const expressApp: Express = express()

// middlewares
expressApp.use(express.json())

// the routes
expressApp.get('/', (req, res) => {
  res.send(`Express + TS server is working`)
})

export default expressApp

import express, { Express } from 'express'

// the express application
const expressApp: Express = express()

// the routes
expressApp.get('/', (req, res) => {
  res.send(`Express + TS server is working`)
})

export default expressApp

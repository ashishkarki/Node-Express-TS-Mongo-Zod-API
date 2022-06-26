import http from 'http'
import config from 'config'

import expressApp from './app'
import { connectToDatabase, logger } from '../utils'
import indexRoutes from './routes'

// the server
const server = http.createServer(expressApp)

// the listening
const PORT = config.get<number>('port') || 5001
const HOST = process.env.HOST || 'localhost'
server.listen(PORT, async () => {
  await connectToDatabase()

  logger.info(`Server running on http://${HOST}:${PORT}`)

  indexRoutes(expressApp)
})

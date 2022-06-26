import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

const connectToDatabase = async () => {
  const dbUri = config.get<string>('dbUri')

  try {
    const connection = await mongoose.connect(dbUri)

    logger.info(`Connected to database successfully..`)

    return connection
  } catch (error: any) {
    logger.error(
      `DB connection error, reason: ${error.message}. Server will not be run!!`
    )
    process.exit(1)
  }
}

export default connectToDatabase

import dotenv from 'dotenv'
import startApp from './app'
import { logger } from './utils'
import { db } from './db'

dotenv.config()

db.on('error', () => logger.error('db connection error'))

db.once('open', startApp)

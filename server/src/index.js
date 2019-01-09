import startApp from './app'
import { logger } from './utils'
import { db } from './db'

db.on('error', () => logger.error('db connection error'))

db.once('open', startApp)

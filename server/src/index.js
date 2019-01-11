import 'module-alias/register'

import { logger } from '@utils'
import { db } from '@db'
import startApp from './app'

db.on('error', () => logger.error('db connection error'))

db.once('open', startApp)

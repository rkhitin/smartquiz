import winston from 'winston'

import envs from './envs'

const logger = winston.createLogger({
  format: winston.format.json(),
  silent: envs.isTest,
})

const transport = envs.isDev
  ? new winston.transports.Console()
  : new winston.transports.File({ filename: 'error.log', level: 'error' })

logger.add(transport)

export default logger

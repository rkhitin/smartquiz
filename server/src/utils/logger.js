import winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.json(),
  silent: process.env.NODE_ENV === 'testing',
})

const transport =
  process.env.NODE_ENV === 'development'
    ? new winston.transports.Console()
    : new winston.transports.File({ filename: 'error.log', level: 'error' })

logger.add(transport)

export default logger

import express from 'express'
import morgan from 'morgan'

import { envs, logger } from './utils'

const app = express()
const port = envs.isProd ? 80 : 1234

// Log http request only in development
if (envs.isDev) {
  app.use(morgan('combined'))
}

app.get('/', (req, res) => res.send('H98llo World!'))

app.listen(port, () => logger.log('info', `Example app listening on port ${port}!`))

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from './passport'

import { envs, logger } from './utils'
import routing from './routing'

export default function() {
  const app = express()
  const port = envs.isProd ? 80 : 1234

  // Log http request only in development
  if (envs.isDev) {
    app.use(morgan('combined'))
  }

  // Configuration
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
  app.use(passport.initialize())
  app.use(passport.session())

  // Routing
  app.use('/api', routing)
  app.get('/', (req, res) => res.send('hello'))

  app.listen(port, () => logger.info(`Example app listening on port ${port}!`))
}

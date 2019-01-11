import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import { getConfig, logger } from '@utils'
import { passport } from '@libs'
import routing from './routing'

export default function() {
  const app = express()
  const port = getConfig().port

  // Log http request only in development
  if (process.env.NODE_ENV === 'development') {
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
  // TODO: remove
  app.get('/', (req, res) => res.send('hello'))

  app.listen(port, () => logger.info(`App listening on port ${port}!`))

  return app
}

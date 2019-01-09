import mongoose from 'mongoose'

import { envs } from '../utils'

const dbName = (() => {
  switch (true) {
    case envs.isTest:
      return process.env.TEST_DB_NAME
    case envs.isProd:
      return process.env.DB_NAME
    case envs.isDev:
    default:
      return process.env.DEV_DB_NAME
  }
})()

mongoose.connect(
  `mongodb://localhost/${dbName}`,
  { useNewUrlParser: true }
)

const db = mongoose.connection

export default db

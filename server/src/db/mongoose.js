import mongoose from 'mongoose'

import { envs } from '../utils'
import { db as dbConfig } from '../config'

const dbName = (() => {
  switch (true) {
    case envs.isTest:
      return dbConfig.dbNames.test
    case envs.isProd:
      return dbConfig.dbNames.prod
    case envs.isDev:
    default:
      return dbConfig.dbNames.dev
  }
})()

mongoose.connect(
  `mongodb://localhost/${dbName}`,
  { useNewUrlParser: true }
)

const db = mongoose.connection

export default db

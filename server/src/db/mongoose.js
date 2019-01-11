import mongoose from 'mongoose'

import { getConfig } from '@utils'

mongoose.connect(
  `mongodb://localhost/${getConfig().dbName}`,
  { useNewUrlParser: true, useCreateIndex: true }
)

const db = mongoose.connection

export default db

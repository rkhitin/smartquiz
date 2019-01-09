import bcrypt from 'bcrypt'

import db from '../mongoose'
import { User } from '../models'
import { usersRoles } from '../contants'

db.once('open', async () => {
  const encryptedPassword = await bcrypt.hash(process.env.DEV_ADMIN_PASS, 10)

  await User.deleteMany({})

  await User.create({
    login: process.env.DEV_ADMIN_LOGIN,
    role: usersRoles.admin,
    password: encryptedPassword,
  })

  db.close()
})

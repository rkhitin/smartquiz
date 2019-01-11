import 'module-alias/register'

import db from './mongoose'
import { User, usersRoles } from '@users'
import { getConfig } from '@utils'

db.once('open', async () => {
  await User.deleteMany({})

  await User.encryptPasswordAndCreateUser({
    password: getConfig().admin.password,
    login: getConfig().admin.login,
    role: usersRoles.admin,
  })

  await User.encryptPasswordAndCreateUser({
    password: getConfig().editor.password,
    login: getConfig().editor.login,
    role: usersRoles.editor,
  })

  db.close()
})

import { getConfig } from '@utils'
import { usersRoles } from '@users'

describe('Users', () => {
  global.admin = { ...getConfig().admin, role: usersRoles.admin }
  global.editor = { ...getConfig().editor, role: usersRoles.editor }
  global.editorId = null
  global.adminId = null

  require('./me')
  require('./list')
  require('./get')
  require('./create')
  require('./update')
})

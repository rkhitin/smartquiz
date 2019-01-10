import { expect } from 'chai'
import bcrypt from 'bcrypt'

import { usersRoles } from '../db/contants'
import { test as seedTestData } from '../db/seeds'

const admin = {
  login: 'admin',
  role: usersRoles.admin,
  encryptedPassword: null,
  password: '123456',
}

const editor = {
  login: 'editor',
  role: usersRoles.editor,
  encryptedPassword: null,
  password: '123456',
}

const checkUser = (userFromBack, user) => {
  const e = expect(userFromBack)

  e.to.have.deep.property('login', user.login)
  e.to.have.deep.property('role', user.role)
  e.to.have.deep.property('encryptedPassword', user.encryptedPassword)
}

describe('Users', function() {
  before(async () => {
    admin.encryptedPassword = await bcrypt.hash(admin.password, 10)
    editor.encryptedPassword = await bcrypt.hash(editor.password, 10)

    await seedTestData([admin, editor])
  })

  describe('Not authorized', function() {
    it('Me endpoint close for not authorized', async function() {
      await global.agent.get('/api/users/me').expect(401)
    })

    it('List endpoint close for not authorized', async function() {
      await global.agent.get('/api/users').expect(401)
    })

    it('Create endpoint close for not authorized', async function() {
      await global.agent.post('/api/users/create').expect(401)
    })

    it('Update endpoint close for not authorized', async function() {
      await global.agent.post('/api/users/update').expect(401)
    })

    it('Remove endpoint close for not authorized', async function() {
      await global.agent.post('/api/users/remove').expect(401)
    })
  })

  describe('Admin', function() {
    it('Authorize', async function() {
      const res = await global.agent
        .post('/api/users/login')
        .send({
          login: admin.login,
          password: admin.password,
        })
        .expect(200)

      checkUser(res.body, admin)
    })

    it('Me', async function() {
      const res = await global.agent.get('/api/users/me').expect(200)

      checkUser(res.body, admin)
    })

    it('List', async function() {
      const res = await global.agent.get('/api/users').expect(200)

      expect(res.body).to.have.length(2)

      const adminFromBack = res.body.find(u => u.login === admin.login)
      const editorFromBack = res.body.find(u => u.login === editor.login)

      checkUser(adminFromBack, admin)
      checkUser(editorFromBack, editor)
    })
  })
})

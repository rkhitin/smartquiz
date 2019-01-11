import { expect } from 'chai'

import { usersRoles } from '../db/contants'
import { test as seedTestData } from '../db/seeds'

const admin = {
  login: 'admin',
  role: usersRoles.admin,
  password: '123456',
}

const editor = {
  login: 'editor',
  role: usersRoles.editor,
  password: '123456',
}

let editorId = null

const checkUser = (userFromBack, user) => {
  const e = expect(userFromBack)

  e.to.have.deep.property('login', user.login)
  e.to.have.deep.property('role', user.role)
}

describe('Users', function() {
  before(async () => {
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

      editorId = editorFromBack._id

      checkUser(adminFromBack, admin)
      checkUser(editorFromBack, editor)
    })

    it('Get editor', async function() {
      const res = await global.agent
        .post('/api/users/get')
        .send({ id: editorId })
        .expect(200)

      checkUser(res.body, editor)
    })

    it('Update editors login', async function() {
      editor.login = 'editor2'

      await global.agent
        .post('/api/users/update')
        .send({
          id: editorId,
          login: editor.login,
        })
        .expect(200)
    })

    it('Update editors login', async function() {
      editor.login = 'editor2'

      await global.agent
        .post('/api/users/update')
        .send({
          id: editorId,
          login: editor.login,
        })
        .expect(200)
    })

    it('Get editor with new login', async function() {
      const res = await global.agent
        .post('/api/users/get')
        .send({ id: editorId })
        .expect(200)

      checkUser(res.body, editor)
    })

    it('Try update editors with wrong role', async function() {
      await global.agent
        .post('/api/users/update')
        .send({
          id: editorId,
          role: 'nya!',
        })
        .expect(200)
    })

    it('Get editor with old role', async function() {
      const res = await global.agent
        .post('/api/users/get')
        .send({ id: editorId })
        .expect(200)

      checkUser(res.body, editor)
    })

    it('Update editors role', async function() {
      editor.role = usersRoles.admin

      await global.agent
        .post('/api/users/update')
        .send({
          id: editorId,
          role: editor.role,
        })
        .expect(200)
    })

    it('Get editor with new role', async function() {
      const res = await global.agent
        .post('/api/users/get')
        .send({ id: editorId })
        .expect(200)

      checkUser(res.body, editor)
    })

    it('Update editors password', async function() {
      editor.password = '654321'

      await global.agent
        .post('/api/users/update')
        .send({
          id: editorId,
          password: editor.password,
        })
        .expect(200)
    })

    it('Get editor with new password', async function() {
      const res = await global.agent
        .post('/api/users/get')
        .send({ id: editorId })
        .expect(200)

      checkUser(res.body, editor)
    })
  })
})

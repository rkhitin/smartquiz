import { expect } from 'chai'

import { authenticate, checkUser } from '@tests/helpers'
import { messages } from '../constants'

describe('Update', async () => {
  it('Endpoint close for not authonticated', async () => {
    await global.agent.get('/api/users/me').expect(401)
  })

  it('Authenticate editor', async () => {
    await authenticate(global.editor)
  })

  it('Can not update another user', async () => {
    await global.agent
      .post('/api/users/update')
      .send({
        id: global.adminId,
        login: 'two',
        password: '654321',
        role: 'admin',
      })
      .expect(403)
  })

  it('Can update himself', async () => {
    global.editor.login = 'editor2'

    const res = await global.agent
      .post('/api/users/update')
      .send({ ...global.editor, id: global.editorId })
      .expect(200)

    checkUser(res.body, global.editor)
  })

  it('Return correct new user', async () => {
    const res = await global.agent.get('/api/users/me').expect(200)

    checkUser(res.body, global.editor)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })

  it('Authenticate admin', async () => {
    await authenticate(global.admin)
  })

  it('Admin can update another, login can be updated', async () => {
    global.editor.login = 'editor3'

    const res = await global.agent
      .post('/api/users/update')
      .send({ login: global.editor.login, id: global.editorId })
      .expect(200)

    checkUser(res.body, global.editor)
  })

  it('Login can not be duplicated', async () => {
    const res = await global.agent
      .post('/api/users/update')
      .send({ login: global.admin.login, id: global.editorId })
      .expect(400)

    expect(res.text).to.equal(messages.sameLoginExist)
  })

  it('Password can be updated', async () => {
    global.editor.password = '654321'

    const res = await global.agent
      .post('/api/users/update')
      .send({ password: global.editor.password, id: global.editorId })
      .expect(200)

    checkUser(res.body, global.editor)
  })

  it('Password can not be to short', async () => {
    const res = await global.agent
      .post('/api/users/update')
      .send({ password: '123', id: global.editorId })
      .expect(400)

    expect(res.text).to.equal(messages.toShortPassword)
  })

  it('Role can be updated', async () => {
    global.editor.role = 'admin'

    const res = await global.agent
      .post('/api/users/update')
      .send({ role: global.editor.role, id: global.editorId })
      .expect(200)

    checkUser(res.body, global.editor)
  })

  it('Can not set wrong role', async () => {
    const res = await global.agent
      .post('/api/users/update')
      .send({ role: 'nya', id: global.editorId })
      .expect(400)

    expect(res.text).to.equal(messages.wrongRole)
  })

  it('Can update all at same time', async () => {
    global.editor.login = 'editor4'
    global.editor.password = '123654'
    global.editor.role = 'editor'

    const res = await global.agent
      .post('/api/users/update')
      .send({ ...global.editor, id: global.editorId })
      .expect(200)

    checkUser(res.body, global.editor)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })
})

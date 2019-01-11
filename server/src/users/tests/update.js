import { authenticate, checkUser } from '@tests/helpers'

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
      .expect(403)

    checkUser(res.body, global.editor)
  })

  it('Returm correct new user', async () => {
    const res = await global.agent.get('/api/users/me').expect(200)

    checkUser(res.body, global.editor)
  })
})

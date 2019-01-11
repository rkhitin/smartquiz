import { authenticate, checkUser } from '@tests/helpers'

describe('Get', async () => {
  it('Endpoint close for not authonticated', async () => {
    await global.agent
      .post('/api/users/get')
      .send({ id: '12345' })
      .expect(401)
  })

  it('Authenticate editor', async () => {
    await authenticate(global.editor)
  })

  it('Editor can get himself', async () => {
    const res = await global.agent
      .post('/api/users/get')
      .send({ id: global.editorId })
      .expect(200)

    checkUser(res.body, global.editor)
  })

  it('Editor can not get admin', async () => {
    await global.agent
      .post('/api/users/get')
      .send({ id: global.adminId })
      .expect(403)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })

  it('Authenticate admin', async () => {
    await authenticate(global.admin)
  })

  it('Admin can get himself', async () => {
    const res = await global.agent
      .post('/api/users/get')
      .send({ id: global.adminId })
      .expect(200)

    checkUser(res.body, global.admin)
  })

  it('Admin can get editor', async () => {
    const res = await global.agent
      .post('/api/users/get')
      .send({ id: global.editorId })
      .expect(200)

    checkUser(res.body, global.editor)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })
})

import { expect } from 'chai'

import { authenticate } from '@tests/helpers'

describe('Remove', async () => {
  it('Endpoint close for not authonticated', async () => {
    await global.agent.post('/api/users/remove').expect(401)
  })

  it('Authenticate editor', async () => {
    await authenticate(global.editor)
  })

  it('Editor can not remove user', async () => {
    await global.agent
      .post('/api/users/remove')
      .send({ id: global.adminId })
      .expect(403)
  })

  it('Editor can remove himself', async () => {
    await global.agent
      .post('/api/users/remove')
      .send({ id: global.editorId })
      .expect(200)
  })

  it('User logout when removed himself', async () => {
    await global.agent.get('/api/users/me').expect(401)
  })

  it('Authenticate admin', async () => {
    await authenticate(global.admin)
  })

  it('2 users in db', async () => {
    const res = await global.agent.get('/api/users').expect(200)

    expect(res.body).to.have.length(2)
  })

  it('Admin can remove another', async () => {
    await global.agent
      .post('/api/users/remove')
      .send({ id: global.newUserId })
      .expect(200)
  })

  it('1 user in db', async () => {
    const res = await global.agent.get('/api/users').expect(200)

    expect(res.body).to.have.length(1)
  })
})

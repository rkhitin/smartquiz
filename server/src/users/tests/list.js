import { expect } from 'chai'

import { authenticate, checkUser } from '@tests/helpers'

describe('List', async () => {
  it('Endpoint close for not authenticated', async () => {
    await global.agent.get('/api/users').expect(401)
  })

  it('Authenticate editor', async () => {
    await authenticate(global.editor)
  })

  it('Endpoint close for editor', async () => {
    await global.agent.get('/api/users').expect(403)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })

  it('Authenticate admin', async () => {
    await authenticate(global.admin)
  })

  it('Returm correct users list', async () => {
    const res = await global.agent.get('/api/users').expect(200)

    expect(res.body).to.have.length(2)

    const adminFromBack = res.body.find(u => u.login === global.admin.login)
    const editorFromBack = res.body.find(u => u.login === global.editor.login)

    global.editorId = editorFromBack._id
    global.adminId = adminFromBack._id

    checkUser(adminFromBack, global.admin)
    checkUser(editorFromBack, global.editor)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })
})

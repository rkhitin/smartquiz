import { authenticate, checkUser } from '@tests/helpers'

describe('Me', async () => {
  it('Endpoint close for not authonticated', async () => {
    await global.agent.get('/api/users/me').expect(401)
  })

  it('Authenticate', async () => {
    await authenticate(global.admin)
  })

  it('Returm correct user', async () => {
    const res = await global.agent.get('/api/users/me').expect(200)

    checkUser(res.body, global.admin)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })
})

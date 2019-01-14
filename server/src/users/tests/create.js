import { expect } from 'chai'

import { authenticate, checkUser } from '@tests/helpers'
import { messages } from '../constants'

const users = {
  withExistLogin: {
    login: 'admin',
    role: 'editor',
    password: '123456',
  },
  withShortPassword: {
    login: 'one',
    role: 'editor',
    password: '1234',
  },
  withWrongRole: {
    login: 'one',
    role: 'nya',
    password: '123456',
  },
  correct: {
    login: 'one',
    role: 'editor',
    password: '123456',
  },
}

describe('Create', async () => {
  it('Endpoint close for not authonticated', async () => {
    await global.agent
      .post('/api/users/create')
      .send({})
      .expect(401)
  })

  it('Authenticate editor', async () => {
    await authenticate(global.editor)
  })

  it('Endpoint close for editor', async () => {
    await global.agent
      .post('/api/users/create')
      .send({})
      .expect(403)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })

  it('Authenticate admin', async () => {
    await authenticate(global.admin)
  })

  it('Can not create user with existing login', async () => {
    const res = await global.agent
      .post('/api/users/create')
      .send(users.withExistLogin)
      .expect(400)

    expect(res.text).to.equal(messages.sameLoginExist)
  })

  it('Can not create user with short password', async () => {
    const res = await global.agent
      .post('/api/users/create')
      .send(users.withShortPassword)
      .expect(400)

    expect(res.text).to.equal(messages.toShortPassword)
  })

  it('Can not create user with wrong role', async () => {
    const res = await global.agent
      .post('/api/users/create')
      .send(users.withWrongRole)
      .expect(400)

    expect(res.text).to.equal(messages.wrongRole)
  })

  it('Can create correct user', async () => {
    const res = await global.agent
      .post('/api/users/create')
      .send(users.correct)
      .expect(200)

    global.newUserId = res.body._id

    checkUser(res.body, users.correct)
  })

  it('Authenticate new user', async () => {
    await authenticate(users.correct)
  })

  it('Can get created user', async () => {
    const res = await global.agent.get('/api/users/me').expect(200)

    checkUser(res.body, users.correct)
  })

  it('Logout', async () => {
    await global.agent.get('/api/users/logout').expect(200)
  })
})

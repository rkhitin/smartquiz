import { expect } from 'chai'

export const authenticate = async user => {
  const res = await global.agent
    .post('/api/users/login')
    .send({
      login: user.login,
      password: user.password,
    })
    .expect(200)

  return res
}

export const checkUser = (userFromBack, user) => {
  const e = expect(userFromBack)

  e.to.have.deep.property('login', user.login)
  e.to.have.deep.property('role', user.role)
}

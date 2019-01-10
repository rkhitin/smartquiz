import request from 'supertest'
import { db } from '../db'
import startApp from '../app'

before(done => {
  db.once('open', () => {
    const app = startApp()

    global.agent = request.agent(app)

    done()
  })
})

after(done => {
  db.close(done)
})

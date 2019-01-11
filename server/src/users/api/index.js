import { Router } from 'express'

import { passport } from '@libs'
import { checkAuthentication } from '@utils'

const router = Router()

// Authorization
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})
router.get('/logout', function(req, res) {
  req.logout()
  res.sendStatus(200)
})

// Getters
router.get('/', checkAuthentication, require('./list').default)
router.get('/me', checkAuthentication, require('./me').default)
router.post('/get', require('./get').default)

// Setters
router.post('/create', checkAuthentication, require('./create').default)
router.post('/update', checkAuthentication, require('./update').default)
router.post('/remove', checkAuthentication, require('./remove').default)

export { router }

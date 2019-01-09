import { Router } from 'express'

import passport from '../passport'
import create from './create'
import list from './list'
import me from './me'
import update from './update'
import remove from './remove'

const router = Router()

router.get('/', list)
router.get('/me', me)
router.post('/create', create)
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})
router.post('/update', update)
router.post('/remove', remove)

export default router

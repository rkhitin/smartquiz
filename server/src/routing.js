import { Router } from 'express'

import { register, loginCallbacks } from './auth'

const router = Router()

router.post('/register', register)
router.get('/login', ...loginCallbacks)

export default router

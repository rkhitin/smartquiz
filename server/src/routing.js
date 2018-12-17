import { Router } from 'express'

import { register, authorize } from './auth'

const router = Router()

router.post('/register', register)
router.get('/authorize', authorize)

export default router

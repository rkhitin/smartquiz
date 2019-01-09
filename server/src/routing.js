import { Router } from 'express'

import { routing as usersRouting } from './users'

const router = Router()

router.use('/users', usersRouting)

export default router

import { Router } from 'express'

import { router as usersRouter } from '@users/api'

const router = Router()

router.use('/users', usersRouter)

export default router

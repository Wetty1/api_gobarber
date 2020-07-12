import { Router } from 'express'
import appoitmentRouter from './appointments.routes'
import usersRouter from './user.routes'
import sessionsRouter from './seesions.routes'
import sessionRouter from './seesions.routes'

const router = Router()

router.use('/appointments', appoitmentRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionRouter)

export default router

import { Router } from 'express'
import appoitmentRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@modules/users/infra/http/routes/user.routes'
import sessionRouter from '@modules/users/infra/http/routes/seesions.routes'

const router = Router()

router.use('/appointments', appoitmentRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionRouter)

export default router

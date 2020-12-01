import { Router } from 'express'
import appoitmentRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@modules/users/infra/http/routes/user.routes'
import sessionRouter from '@modules/users/infra/http/routes/seesions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes'

const router = Router()

router.use('/appointments', appoitmentRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionRouter)
router.use('/password', passwordRouter)
router.use('/profile', profileRouter)
router.use('/providers', providersRouter)

export default router

import { Router } from 'express'
import appoitmentRouter from './appointments.routes'

const router = Router()

router.use('/appointments', appoitmentRouter)

export default router

import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmnetsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmnetsController.create);

export default appointmentsRouter


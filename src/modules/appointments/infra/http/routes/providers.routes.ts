import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersControllers';

const providersRouter = Router()
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.post('/', providersController.index);

export default providersRouter


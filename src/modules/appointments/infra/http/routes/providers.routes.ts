import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersControllers';
import ProviderMonthAvailabilityController from '../controllers/ProviderMounthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import { celebrate, Joi, Segments } from 'celebrate';

const providersRouter = Router()
const providersController = new ProvidersController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();
const providerDayAvailability = new ProviderDayAvailabilityController();


providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
}), providerMonthAvailability.index);

providersRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
}), providerDayAvailability.index)

export default providersRouter


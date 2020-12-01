import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express'
import { container } from "tsyringe";

import ProfileController from "../controllers/ProfileController";

import ensureAuthenticated from "../middleware/ensureAuthenticated";

const profileRouter = Router()
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().uuid().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),

  },
}), profileController.update);

export default profileRouter


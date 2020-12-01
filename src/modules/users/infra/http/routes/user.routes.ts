import { Router } from 'express'
import { container } from "tsyringe";
import multer from 'multer'
import uploadConfig from '@config/upload'

import UsersController from "../controllers/UserController";
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from "../middleware/ensureAuthenticated";

const usersRouter = Router()
const upload = multer(uploadConfig.multer);
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', userController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter


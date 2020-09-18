import { Request, Response } from "express";
import { container } from "tsyringe";

import UsersRepositories from '@modules/users/infra/typeorm/repositories/UsersRepository'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  async create(request: Request, response: Response) {
    const usersRepositories = new UsersRepositories();
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token })
  }

}

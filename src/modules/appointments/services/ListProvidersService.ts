import { injectable, inject } from "tsyringe";

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../../users/repositories/IUsersRepository'

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.userRepository.findAllProviders({
      except_user_id: user_id
    });

    if (!user)
      throw new AppError('User not found');

    return user;
  }
}

export default ListProvidersService;

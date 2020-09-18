import { EntityRepository, getRepository, Repository } from 'typeorm'

import IUsersTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import UserToken from '../entities/UserToken'

class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async findByEmail(email: string): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });

    return user;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id
    })

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;

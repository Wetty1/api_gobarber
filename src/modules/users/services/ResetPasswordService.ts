import { injectable, inject } from "tsyringe";
import { isAfter, addHours } from 'date-fns'

import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import AppError from "@shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken)
      throw new AppError('User token does not exists');

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user)
      throw new AppError('User does not exists');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default SendForgotPasswordEmailService;

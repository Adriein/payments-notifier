import { User } from '../entities/User.entity';
import { UserNotExistError } from '../errors/UserNotExistError';
import { IUserRepository } from '../interfaces/IUserRepository';
import { Email } from '../VO/Email.vo';

export class UserFinder {
  constructor(private repository: IUserRepository) {}

  public async find(
    email: string | undefined = undefined
  ): Promise<User | User[]> {
    if (email) {
      const user = await this.repository.findByEmail(new Email(email));

      if (!user) {
        throw new UserNotExistError(email);
      }
      return user;
    }

    return await this.repository.findAll();
  }
}
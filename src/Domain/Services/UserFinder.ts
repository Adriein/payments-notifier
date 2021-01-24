import { User } from '../Entities/User.entity';
import { UserNotExistError } from '../Errors/UserNotExistError';
import { IUserRepository } from '../Interfaces/IUserRepository';
import { Email } from '../VO/Email.vo';

export class UserFinder {
  constructor(private repository: IUserRepository) {}

  public async find(
    email: string | undefined = undefined,
    id: string | undefined = undefined
  ): Promise<User | User[]> {
    if (email) {
      const user = await this.repository.findByEmail(new Email(email));

      if (!user) {
        throw new UserNotExistError(email);
      }
      return user;
    }

    if (id) {
      const user = await this.repository.findOne(id);
      if (!user) {
        throw new UserNotExistError();
      }
      return user;
    }

    return await this.repository.findAll();
  }
}

import { Log } from '../Decorators/Log';
import { Criteria } from '../Entities/Criteria.entity';
import { Filter } from '../Entities/Filter.entity';
import { User } from '../Entities/User.entity';
import { UserNotExistError } from '../Errors/UserNotExistError';
import { IUserRepository } from '../Interfaces/IUserRepository';
import { Email } from '../VO/Email.vo';

export class UserFinder {
  constructor(private repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async find(
    email?: string,
    id?: string,
    criteria?: Criteria
  ): Promise<User | User[]> {
    if (email) {
      const user = await this.repository.findByEmail(new Email(email));

      if (!user) {
        throw new UserNotExistError(email);
      }
      return user;
    }

    if (id) {
      const user = await this.repository.findById(id);
      if (!user) {
        throw new UserNotExistError();
      }
      return user;
    }

    if (criteria) {
      return await this.repository.find(criteria);
    }

    return await this.repository.findAll();
  }
}

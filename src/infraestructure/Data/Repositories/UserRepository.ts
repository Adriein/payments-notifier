import { User } from '../../../domain/entities/User.entity';
import { IMapper } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { Email } from '../../../domain/VO/Email.vo';
import { GenericRepository } from './GenericRepository';

export class UserRepository
  extends GenericRepository<User>
  implements IUserRepository {
  constructor(protected entity: string, protected mapper: IMapper<User>) {
    super(entity, mapper);
  }
  async findByName(username: string): Promise<User> {
    throw new Error();
  }

  async findByEmail(email: Email): Promise<User | undefined> {
    const { rows } = await this.db.query(
      `SELECT * FROM ${this.entity} WHERE email='${email.email}';`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }

  async findAll(): Promise<User[]> {
    throw new Error();
  }
}

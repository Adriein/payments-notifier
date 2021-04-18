import { Log } from '../Decorators/Log';
import { Criteria } from '../Entities/Criteria.entity';
import { User } from '../Entities/User.entity';
import { UserNotExistError } from '../Errors';
import { IUserRepository } from '../Interfaces/IUserRepository';
import { Email } from '../VO/Email.vo';

export class UserFinder {
  private _adminId!: string;
  private _onlyAdmins: boolean = false;

  constructor(private repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async find(criteria?: Criteria): Promise<User[]> {
    if (criteria || this._adminId) {
      return await this.repository.find(this._adminId, criteria);
    }

    return await this.repository.findAll(this._onlyAdmins);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findByEmail(new Email(email));

    if (!user) {
      throw new UserNotExistError(email);
    }
    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new UserNotExistError();
    }
    return user;
  }

  public adminId(adminId: string): this {
    this._adminId = adminId;
    return this;
  }

  public onlyAdmins(): this {
    this._onlyAdmins = true;
    return this;
  }
}

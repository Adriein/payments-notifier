import { Criteria } from '../Entities/Criteria.entity';
import { User } from '../Entities/User.entity';
import { Email } from '../VO/Email.vo';
import { IRepository } from './IRepository';

export interface IUserRepository extends IRepository<User> {
  find(criteria: Criteria): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: Email): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  updateUserNotifications(
    configId: string,
    sendWarnings: boolean
  ): Promise<void>;
}

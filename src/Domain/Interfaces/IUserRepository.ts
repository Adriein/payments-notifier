import { Criteria } from '../Entities/Criteria.entity';
import { Subscription } from '../Entities/Subscription.entity';
import { User } from '../Entities/User.entity';
import { Email } from '../VO/Email.vo';
import { IRepository } from './IRepository';

export interface IUserRepository extends IRepository<User> {
  find(adminId: string, criteria?: Criteria): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: Email): Promise<User | undefined>;
  findAll(onlyAdmins: boolean): Promise<User[]>;
  updateUserNotifications(
    configId: string,
    sendWarnings: boolean
  ): Promise<void>;
  insertNewSubscription(user: User): Promise<void>;
  getAllSubscriptionsByUser(id: string): Promise<Subscription[]>;
}

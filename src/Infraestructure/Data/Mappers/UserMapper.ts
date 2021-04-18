import { User } from '../../../Domain/Entities/User.entity';
import { UserConfig } from '../../../Domain/Entities/UserConfig.entity';
import { IMapper } from '../../../Domain/Interfaces';
import { Email } from '../../../Domain/VO/Email.vo';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { Password } from '../../../Domain/VO/Password.vo';
import { Pricing } from '../../../Domain/VO/Pricing.vo';

type UsersTableJoined = {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  owner_id: string | null;
  subscriptions_id: string;
  pricing: string;
  payment_date: string;
  warned: boolean;
  notified: boolean;
  active: boolean;
  config_id: string;
  language: string;
  role: string;
  send_notifications: boolean;
  send_warnings: boolean;
};

type UsersTable = {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string | null;
  owner_id: string | null;
};

export class UserMapper implements IMapper<User> {
  public domain(userDatamodel: UsersTableJoined): User {
    const user = new User(
      userDatamodel.id,
      userDatamodel.username,
      new Email(userDatamodel.email),
      new UserConfig(
        userDatamodel.language,
        userDatamodel.role,
        userDatamodel.send_notifications,
        userDatamodel.send_warnings,
        userDatamodel.config_id
      ),
      userDatamodel.owner_id ? userDatamodel.owner_id : undefined
    );
    user.setPassword(new Password(userDatamodel.password));   
    user.setCreatedAt(new Date(userDatamodel.created_at));

    if (userDatamodel.subscriptions_id !== null) {
      user.setSubscription(
        userDatamodel.subscriptions_id,
        new Pricing(JSON.parse(userDatamodel.pricing)),
        new LastPaymentDate(userDatamodel.payment_date),
        userDatamodel.warned,
        userDatamodel.notified,
        userDatamodel.active
      );
    }

    return user;
  }
  public datamodel(domain: User): UsersTable {
    return {
      id: domain.getId(),
      username: domain.getName(),
      email: domain.getEmail(),
      password: domain.getPassword()!,
      created_at: 'now()',
      owner_id: domain.ownerId || null,
    };
  }
}

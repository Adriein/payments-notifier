import { Log } from '../../../domain/Decorators/Log';
import { User } from '../../../domain/entities/User.entity';
import { IMapper } from '../../../domain/interfaces';
import { Email } from '../../../domain/VO/Email.vo';
import { LastPaymentDate } from '../../../domain/VO/LastPaymentDate.vo';
import { Password } from '../../../domain/VO/Password.vo';
import { Pricing } from '../../../domain/VO/Pricing.vo';

type UsersTable = {
  id: string;
  username: string;
  email: string;
  password: string;
  subscription_id?: string | null;
};

type SubscriptionsTable = {
  id: string;
  pricing: string;
  payment_date: string;
  warned: boolean;
  notified: boolean;
};

export class UserMapper implements IMapper<User> {
  
  @Log(process.env.LOG_LEVEL)
  public domain(
    userDatamodel: UsersTable,
    subscriptionDatamodel: SubscriptionsTable | undefined = undefined
  ): User {
    const user = new User(
      userDatamodel.id,
      userDatamodel.username,
      new Email(userDatamodel.email)
    );
    user.setPassword(new Password(userDatamodel.password));

    if (subscriptionDatamodel) {
      user.setSubscription(
        subscriptionDatamodel.id,
        new Pricing(subscriptionDatamodel.pricing),
        new LastPaymentDate(subscriptionDatamodel.payment_date),
        subscriptionDatamodel.warned,
        subscriptionDatamodel.notified
      );
    }

    return user;
  }

  @Log(process.env.LOG_LEVEL)
  public datamodel(domain: User): UsersTable {
    return {
      id: domain.getId(),
      username: domain.getName(),
      email: domain.getEmail(),
      password: domain.getPassword()!,
      subscription_id: domain.subscriptionId(),
    };
  }
}

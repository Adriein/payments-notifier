import { User } from '../../../domain/entities/User.entity';
import { Email } from '../../../domain/VO/Email.vo';
import { Password } from '../../../domain/VO/Password.vo';

type users = {
  id: string;
  username: string;
  email: string;
  password: string;
  subscription_id?: string | null;
};

export class UserMapper {
  public domain(datamodel: users): User {
    const user = new User(
      datamodel.id,
      datamodel.username,
      new Email(datamodel.email)
    );
    user.setPassword(new Password(datamodel.password));

    return user;
  }

  public datamodel(domain: User): users {
    return {
      id: domain.getId(),
      username: domain.getName(),
      email: domain.getEmail(),
      password: domain.getPassword()!,
      subscription_id: domain.subscriptionId(),
    };
  }
}

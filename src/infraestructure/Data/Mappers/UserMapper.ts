import { User } from '../../../domain/entities/User.entity';
import { LastPaymentDate } from '../../../domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../../domain/VO/Pricing.vo';

type users = {
  id: string;
  name: string;
  email: string;
  pricing: string;
  lastPayment: string;
  notified: boolean;
  warned: boolean;
};

export class UserMapper {
  public domain(datamodel: users): User {

    const user = new User(datamodel.id, datamodel.name, datamodel.email);

    user.createSubscription(
      new Pricing(datamodel.pricing),
      new LastPaymentDate(datamodel.lastPayment),
      datamodel.warned,
      datamodel.notified
    );
    
    return user;
  }

  public datamodel(domain: User): users {
    return {
      id: domain.getId(),
      name: domain.getName(),
      email: domain.getEmail(),
      pricing: domain.getPricing(),
      lastPayment: domain.getPaymentDate().toString(),
      notified: domain.getIsNotified(),
      warned: domain.getIsWarned(),
    };
  }
}

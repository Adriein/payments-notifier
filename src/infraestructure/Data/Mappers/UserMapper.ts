import { User } from '../../../domain/entities/User.entity';

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
    return new User(
      datamodel.id,
      datamodel.name,
      datamodel.email,
      datamodel.pricing,
      new Date(datamodel.lastPayment),
      datamodel.warned,
      datamodel.notified
    );
  }

  public datamodel(domain: User): users {
    return {
      id: domain.getId(),
      name: domain.getName(),
      email: domain.getEmail(),
      pricing: domain.getPricing(),
      lastPayment: domain.getPaymentDate().toString(),
      notified: domain.getSentDefaulter(),
      warned: domain.getSentWarning(),
    };
  }
}

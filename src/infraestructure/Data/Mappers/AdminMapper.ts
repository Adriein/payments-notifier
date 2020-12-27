import { Admin } from '../../../domain/entities/Admin.entity';

type admins = {
  name: string;
  email: string;
};

export class AdminMapper {
  public domain(datamodel: admins): Admin {
    return new Admin(datamodel.name, datamodel.email);
  }

  public datamodel(domain: Admin): admins {
    return {
      name: domain.name,
      email: domain.email,
    };
  }
}

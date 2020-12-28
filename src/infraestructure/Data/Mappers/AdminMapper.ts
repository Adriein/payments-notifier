import { Admin } from '../../../domain/entities/Admin.entity';

type admins = {
  name: string;
  email: string;
  password: string;
};

export class AdminMapper {
  public domain(datamodel: admins): Admin {
    return new Admin(datamodel.name, datamodel.email, datamodel.password);
  }

  public datamodel(domain: Admin): admins {
    return {
      name: domain.name,
      email: domain.email,
      password: domain.password,
    };
  }
}

import { IAuthRepository } from "../../Domain/IAuthRepository";
import { Auth } from "../../Domain/Auth.entity";

export class AuthRepository implements IAuthRepository {
  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(adminId: string, criteria: any): Promise<Auth[]> {
    return Promise.resolve([]);
  }

  findOne(id: string): Promise<Auth | undefined> {
    return Promise.resolve(undefined);
  }

  save(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

}
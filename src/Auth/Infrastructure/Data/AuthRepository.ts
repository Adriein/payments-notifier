import { IAuthRepository } from "../../Domain/IAuthRepository";
import { Auth } from "../../Domain/Auth.entity";
import { AuthMapper } from "./AuthMapper";
import { AuthDAO } from "./Auth.dao";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { SqlTranslator } from "../../../Shared/Domain/Entities/SqlTranslator";

export class AuthRepository implements IAuthRepository {
  private mapper: AuthMapper = new AuthMapper();

  public async delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(adminId: string, criteria: any): Promise<Auth[]> {
    return Promise.resolve([]);
  }

  public async findOne(id: string): Promise<Auth | undefined> {
    return Promise.resolve(undefined);
  }

  public async save(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async update(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findByEmail(email: string): Promise<Auth | undefined> {
    const dao = new AuthDAO();

    const criteria = new Criteria(new SqlTranslator());
    criteria.field('email').equals(email);

    const [ result ] = await dao.find(criteria);
    console.log(result)
    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

}
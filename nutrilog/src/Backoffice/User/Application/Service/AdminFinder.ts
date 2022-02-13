import { User } from "../../Domain/Entity/User.entity";
import { IUserRepository } from "../../Domain/IUserRepository";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/UserFilter";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { ADMIN_ROLE } from "../../Domain/constants";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";

export class AdminFinder {
  constructor(private readonly repository: IUserRepository, private readonly queryBus: IQueryBus) {}

  public async execute(): Promise<User[]> {
    const criteria = new Criteria<UserFilter>();
    const adminRole = await this.queryBus.ask<SearchRoleResponse>(new SearchRoleQuery(ADMIN_ROLE));

    criteria.equal('roleId', adminRole.id);
    criteria.equal('active', true);

    const result = await this.repository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}
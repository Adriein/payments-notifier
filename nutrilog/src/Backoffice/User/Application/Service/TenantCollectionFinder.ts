import { IUserRepository } from "../../Domain/IUserRepository";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/Filter/UserFilter";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { TENANT_ROLE } from "../../Domain/constants";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { Tenant } from "../../Domain/Entity/Tenant.entity";

export class TenantCollectionFinder {
  constructor(private readonly repository: IUserRepository, private readonly queryBus: IQueryBus) {}

  public async execute(): Promise<Tenant[]> {
    const criteria = new Criteria<UserFilter>();
    const tenantRole = await this.queryBus.ask<SearchRoleResponse>(new SearchRoleQuery(TENANT_ROLE));

    criteria.equal('roleId', tenantRole.id);
    criteria.equal('active', true);

    const result = await this.repository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value as Tenant[];
  }
}
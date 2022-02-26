import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { ITenantRepository } from "../../Domain/ITenantRepository";
import { Tenant } from "../../Domain/Entity/Tenant.entity";

export class TenantFinder {
  constructor(private readonly repository: ITenantRepository) {}

  public async execute(id: ID): Promise<Tenant> {
    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}
import { Model } from "../../../Shared/Infrastructure/Decorators/Orm/Model";
import { Column } from "../../../Shared/Infrastructure/Decorators/Orm/Column";
import { AbstractDAO } from "../../../Shared/Infrastructure/Data/AbstractDAO";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { Nullable } from "../../../Shared/Domain/types";

@Model('pricing')
export class PricingDao extends AbstractDAO<PricingDao> {
  @Column() public id!: string;
  @Column() public pricing_name!: string;
  @Column() public duration!: number;
  @Column() public amount!: number;
  @Column() public user_id!: Nullable<string>;
  @Column() public created_at!: string;
  @Column() public updated_at!: string;

  public async find(criteria: Criteria): Promise<PricingDao[]> {
    return await super.find(criteria);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
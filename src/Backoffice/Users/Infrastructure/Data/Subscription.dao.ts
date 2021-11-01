import { AbstractDAO } from "../../../../Shared/Infrastructure/Data/AbstractDAO";
import { Column } from "../../../../Shared/Infrastructure/Decorators/Orm/Column";
import { Model } from "../../../../Shared/Infrastructure/Decorators/Orm/Model";
import { PrimaryColumn } from "../../../../Shared/Infrastructure/Decorators/Orm/PrimaryColumn";

@Model('subscriptions')
export class SubscriptionDAO extends AbstractDAO<SubscriptionDAO> {

  @PrimaryColumn() public id!: string;
  @Column() public pricing_id!: string;
  @Column() public payment_date!: string;
  @Column() public warned!: boolean;
  @Column() public notified!: boolean;
  @Column() public user_id!: string;
  @Column() public active!: boolean;
  @Column() public created_at!: string;
  @Column() public updated_at!: string;

  constructor() {
    super();
  }

  public async getOne(): Promise<SubscriptionDAO | undefined> {
    return await super.getOne(this.id!, true);
  }

  public async save(): Promise<void> {
    await super.save(this);
  }

  public async update(): Promise<void> {
    await super.update(this);
  }
}
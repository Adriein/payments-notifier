import { AbstractDAO } from "../../../Shared/Infrastructure/Data/AbstractDAO";
import { Column } from "../../../Shared/Infrastructure/Decorators/Orm/Column";

export class SubscriptionDAO extends AbstractDAO<SubscriptionDAO> {
  protected table: string = 'subscriptions';
  protected foreign: Map<string, string> = new Map<string, string>();

  @Column() public id!: string;
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

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(): Promise<SubscriptionDAO[] | undefined> {
    return Promise.resolve(undefined);
  }

  public async save(): Promise<void> {
    await super.save(this);
  }

  update(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
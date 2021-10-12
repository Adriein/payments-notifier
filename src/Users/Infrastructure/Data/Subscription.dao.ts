import { AbstractDAO } from "../../../Shared/Infrastructure/Data/AbstractDAO";
import { column } from "../../../Shared/Infrastructure/Decorators/column";

export class SubscriptionDAO extends AbstractDAO<SubscriptionDAO> {
  protected table: string = 'subscriptions';
  protected foreign: Map<string, string> = new Map<string, string>();


  constructor(
    @column() public id: string,
    @column() public pricing_id: string,
    @column() public payment_date: string,
    @column() public warned: boolean,
    @column() public notified: boolean,
    @column() public user_id: string,
    @column() public active: boolean,
    @column() public created_at: string,
    @column() public updated_at: string,
  ) {
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
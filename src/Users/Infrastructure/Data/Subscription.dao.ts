import { AbstractDAO } from "../../../Shared/Infrastructure/Data/AbstractDAO";
import { column } from "../../../Shared/Infrastructure/Decorators/column";

export class SubscriptionDAO extends AbstractDAO<SubscriptionDAO> {
  protected table: string = 'subscriptions';

  @column() public id: string | undefined;
  @column() public username: string | undefined;
  @column() public email: string | undefined;
  @column() public password: string | undefined;
  @column() public owner_id: string | undefined;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;

  constructor() {
    super();
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria: any): Promise<SubscriptionDAO[] | undefined> {
    return Promise.resolve(undefined);
  }

  getOne(relations: string[] | undefined): Promise<SubscriptionDAO | undefined> {
    return Promise.resolve(undefined);
  }

  save(): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(): Promise<void> {
    return Promise.resolve(undefined);
  }

}
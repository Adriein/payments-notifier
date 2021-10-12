import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';
import { SubscriptionDAO } from "./Subscription.dao";
import { UserConfigDAO } from "./UserConfig.dao";
import { Nullable } from "../../../Shared/Domain/types";

export class UserDAO extends AbstractDAO<UserDAO> {
  protected table: string = 'users';
  protected foreign: Map<string, string>;

  @column() public id!: string;
  @column() public username!: string;
  @column() public email!: string;
  @column() public password!: string;
  @column() public owner_id!: string;
  @column() public created_at!: string;
  @column() public updated_at!: string;

  public subscriptions: SubscriptionDAO[] = [];
  public userConfig: Nullable<UserConfigDAO> = null;

  constructor() {
    super();
    this.foreign = new Map([ [ 'subscription', 'user_id' ] ]);
  }

  public async getOne(): Promise<UserDAO | undefined> {
    return await super.getOne(this.id, UserDAO);
  }

  public async find(criteria: Criteria): Promise<UserDAO[]> {
    const query = this.findQuery(criteria)
    const { rows } = await this.db.getConnection().query(query);

    if (!rows) {
      return [];
    }

    return rows.map((row: any) => this.buildDAO(UserDAO, row));
  }

  public async save(): Promise<void> {
    await super.save(this);
  }

  public update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

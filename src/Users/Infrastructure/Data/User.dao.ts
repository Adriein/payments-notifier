import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../Shared/Infrastructure/Decorators/Orm/Column';
import { SubscriptionDAO } from "./Subscription.dao";
import { UserConfigDAO } from "./UserConfig.dao";
import { Nullable } from "../../../Shared/Domain/types";
import { Model } from "../../../Shared/Infrastructure/Decorators/Orm/Model";
import { TABLE_NAME_METADATA } from "../../../Shared/Domain/constants";

@Model('users')
export class UserDAO extends AbstractDAO<UserDAO> {
  protected foreign: Map<string, string>;

  @Column() public id!: string;
  @Column() public username!: string;
  @Column() public email!: string;
  @Column() public password!: string;
  @Column() public owner_id!: string;
  @Column() public created_at!: string;
  @Column() public updated_at!: string;

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

import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';
import { SubscriptionDAO } from "./Subscription.dao";
import { UserConfigDAO } from "./UserConfig.dao";
import { Nullable } from "../../../Shared/Domain/types";

export class UserDAO extends AbstractDAO<UserDAO> {
  protected table: string = 'users';

  @column() public id: string | undefined;
  @column() public username: string | undefined;
  @column() public email: string | undefined;
  @column() public password: string | undefined;
  @column() public owner_id: string | undefined;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;

  public subscriptions: SubscriptionDAO[] = [];
  public userConfig: Nullable<UserConfigDAO> = null;

  constructor(
    id?: string,
    username?: string,
    email?: string,
    password?: string,
    owner_id?: string,
    created_at?: string,
    updated_at?: string
  ) {
    super();
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.owner_id = owner_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public async getOne(relations?: string[]): Promise<UserDAO | undefined> {
    const query = this.selectQuery(this.id!, relations);

    const { rows } = await this.db.getConnection().query(query);

    if (!rows.length) {
      return undefined;
    }

    return this.buildDAO(UserDAO, rows[0])
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
    const query = this.insertQuery(this);

    await this.db.getConnection().query(query);
  }

  public update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

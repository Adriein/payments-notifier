import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';

export class AuthDAO extends AbstractDAO<AuthDAO> {
  protected table: string = 'users';
  protected foreign: Map<string, string> = new Map();

  @column() public id: string | undefined;
  @column() public username: string | undefined;
  @column() public email: string | undefined;
  @column() public password: string | undefined;
  @column() public owner_id: string | undefined;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;

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

  public async getOne(): Promise<AuthDAO | undefined> {
    return await super.getOne(this.id!, AuthDAO);
  }

  public async find(criteria: Criteria): Promise<AuthDAO[]> {
    const query = this.findQuery(criteria)

    const { rows } = await this.db.getConnection().query(query);

    if (!rows) {
      return [];
    }

    return rows.map((row: any) => this.buildDAO(AuthDAO, row));
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

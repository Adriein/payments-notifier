import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';

export class UserDAO extends AbstractDAO<UserDAO> {
  protected table: string = 'users';

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

  public async getOne(relations?: string[]): Promise<UserDAO | undefined> {
    const query = this.selectQuery(this.id!, relations);

    const { rows } = await this.db.getConnection().query(query);

    if (!rows.length) {
      return undefined;
    }

    return new UserDAO(
      rows[0].id,
      rows[0].username,
      rows[0].email,
      rows[0].password,
      rows[0].owner_id,
      rows[0].created_at,
      rows[0].updated_at
    );
  }

  public async find(criteria: Criteria): Promise<UserDAO[]> {
    const query = `
        SELECT *
        FROM ${this.table} ${criteria.toQuery()}
    `;

    const { rows } = await this.db.getConnection().query(query);

    if (!rows) {
      return [];
    }

    return rows.map((row: any) => {
      return new UserDAO(
        row.id,
        row.username,
        row.email,
        row.password,
        row.owner_id,
        row.created_at,
        row.updated_at
      );
    });
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

import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../Shared/Infrastructure/Decorators/Orm/Column';

export class ApiUsageDAO extends AbstractDAO<ApiUsageDAO> {
  protected table: string = 'nutritionix_api_metadata';

  @Column() public id: string | undefined;
  @Column() public user_id: string | undefined;
  @Column() public api_calls: number | undefined;
  @Column() public created_at: string | undefined;
  @Column() public updated_at: string | undefined;

  constructor(
    public _id?: string,
    public _user_id?: string,
    public _api_calls?: number,
    public _created_at?: string,
    public _updated_at?: string
  ) {
    super();
    this.id = _id;
    this.user_id = _user_id;
    this.api_calls = _api_calls;
    this.created_at = _created_at;
    this.updated_at = _updated_at;
  }

  public getOne(relations?: string[]): Promise<ApiUsageDAO | undefined> {
    throw new Error('Method not implemented.');
  }

  public find(criteria: any): Promise<ApiUsageDAO[] | undefined> {
    throw new Error('Method not implemented.');
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

import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../Shared/Infrastructure/Decorators/Orm/Column';

export class NutritionDAO extends AbstractDAO<NutritionDAO> {
  protected table: string = 'nutrition';

  @Column() public id: string | undefined;
  @Column() public weight: number | undefined;
  @Column() public height: number | undefined;
  @Column() public age: number | undefined;
  @Column() public gender: string | undefined;
  @Column() public user_id: string | undefined;
  @Column() public created_at: string | undefined;
  @Column() public updated_at: string | undefined;

  constructor(
    id?: string,
    weight?: number,
    height?: number,
    age?: number,
    gender?: string,
    user_id?: string,
    created_at?: string,
    updated_at?: string
  ) {
    super();
    this.id = id;
    this.weight = weight;
    this.height = height;
    this.age = age;
    this.gender = gender;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public async getOne(relations?: string[]): Promise<NutritionDAO | undefined> {
    const query = this.selectQuery(this.id!, relations);

    const { rows } = await this.db.getConnection().query(query);

    if (!rows.length) {
      return undefined;
    }

    return new NutritionDAO(
      rows[0].id,
      rows[0].weight,
      rows[0].height,
      rows[0].age,
      rows[0].gender,
      rows[0].user_id,
      rows[0].created_at,
      rows[0].updated_at
    );
  }

  public async find(criteria: Criteria): Promise<NutritionDAO[] | undefined> {
    const query = `SELECT * FROM ${this.table} ${criteria.toQuery()}`;
    const { rows } = await this.db.getConnection().query(query);

    if (!rows) {
      return undefined;
    }

    return rows.map((row: any) => {
      return new NutritionDAO(
        row.id,
        row.weight,
        row.height,
        row.age,
        row.gender,
        row.user_id,
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

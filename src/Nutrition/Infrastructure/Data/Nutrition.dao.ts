import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';
import { DietDAO } from './Diet.dao';

export class NutritionDAO extends AbstractDAO<NutritionDAO> {
  protected table: string = 'nutrition';

  @column() public id: string | undefined;
  @column() public weight: number | undefined;
  @column() public height: number | undefined;
  @column() public age: number | undefined;
  @column() public gender: string | undefined;
  @column() public user_id: string | undefined;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;
  public diets: DietDAO[];

  constructor(
    id?: string,
    weight?: number,
    height?: number,
    age?: number,
    gender?: string,
    user_id?: string,
    created_at?: string,
    updated_at?: string,
    diets?: DietDAO[]
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
    this.diets = diets || [];
  }

  public async getOne(relations?: string[]): Promise<NutritionDAO | undefined> {
    const query = this.selectQuery(this.id!, relations);

    const { rows } = await this.db.getConnection().query(query);

    if (!rows.length) {
      return undefined;
    }

    if (relations?.length && !this.isDietJoinEmpty(rows)) {
      const diets = rows.map((row) => {
        return new DietDAO(
          row.diet_id,
          row.diet_name,
          row.objective,
          row.kcal,
          row.nutrition_id,
          row.diet_created_at,
          row.diet_updated_at
        );
      });

      return new NutritionDAO(
        rows[0].id,
        rows[0].weight,
        rows[0].height,
        rows[0].age,
        rows[0].gender,
        rows[0].user_id,
        rows[0].created_at,
        rows[0].updated_at,
        diets
      );
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

  private isDietJoinEmpty(rows: any[]): boolean {
    return rows[0].diet_id === null;
  }
}

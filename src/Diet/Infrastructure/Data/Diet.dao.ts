import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';
import { MealDAO } from './Meal.dao';

export class DietDAO extends AbstractDAO<DietDAO> {
  protected table: string = 'diet';

  @column() public id: string | undefined;
  @column() public diet_name: string | undefined;
  @column() public objective: string | undefined;
  @column() public kcal: number | undefined;
  @column() public nutrition_id: string | undefined;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;
  public meals: MealDAO[];

  constructor(
    id?: string,
    diet_name?: string,
    objective?: string,
    kcal?: number,
    nutrition_id?: string,
    created_at?: string,
    updated_at?: string,
    meals?: MealDAO[]
  ) {
    super();
    this.id = id;
    this.diet_name = diet_name;
    this.objective = objective;
    this.kcal = kcal;
    this.nutrition_id = nutrition_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.meals = meals || [];
  }

  public async getOne(relations?: string[]): Promise<DietDAO | undefined> {
    throw new Error('Method not implemented.');
  }
  public async find(criteria?: any): Promise<DietDAO[] | undefined> {
    throw new Error('Method not implemented.');
  }
  public async save(): Promise<void> {
    const query = this.insertQuery(this);
   
    await this.db.getConnection().query(query);
  }
  public async update(): Promise<void> {
    const query = this.updateQuery(this);
    console.log(query);
    
    await this.db.getConnection().query(query);
  }
  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

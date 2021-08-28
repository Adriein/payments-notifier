import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';

export class MealDAO extends AbstractDAO<MealDAO> {
  protected table: string = 'meal';

  @column() public id: string | undefined;
  @column() public meal_name: string | undefined;
  @column() public diet_id: string | undefined;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;

  constructor(
    id?: string,
    meal_name?: string,
    diet_id?: string,
    created_at?: string,
    updated_at?: string,
  ) {
    super();
    this.id = id;
    this.meal_name = meal_name;
    this.diet_id = diet_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public async getOne(relations?: string[]): Promise<MealDAO | undefined> {
    throw new Error('Method not implemented.');
  }
  public async find(criteria?: any): Promise<MealDAO[] | undefined> {
    throw new Error('Method not implemented.');
  }
  public async save(): Promise<void> {
    const query = this.insertQuery(this);
    console.log(query);
    
    await this.db.getConnection().query(query);
  }
  public async update(): Promise<void> {
    const query = this.updateQuery(this);

    await this.db.getConnection().query(query);
  }
  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

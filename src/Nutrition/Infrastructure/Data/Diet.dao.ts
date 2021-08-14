import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';

export class DietDAO extends AbstractDAO<DietDAO> {
  private table: string = 'diet';

  @column() public id: string | undefined;
  @column() public diet_name: string | undefined;
  @column() public objective: string | undefined;
  @column() public kcal: number | undefined;
  @column() public nutrition_id: string | undefined;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;

  constructor(
    id?: string,
    diet_name?: string,
    objective?: string,
    kcal?: number,
    nutrition_id?: string,
    created_at?: string,
    updated_at?: string
  ) {
    super();
    this.id = id;
    this.diet_name = diet_name;
    this.objective = objective;
    this.kcal = kcal;
    this.nutrition_id = nutrition_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getOne(relations?: string[]): Promise<DietDAO | undefined> {
    throw new Error('Method not implemented.');
  }
  public find(criteria?: any): Promise<DietDAO[] | undefined> {
    throw new Error('Method not implemented.');
  }
  public save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public update(entity: DietDAO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

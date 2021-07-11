import { debug } from '../../../Infraestructure/Helpers/Debug.utils';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';

export class NutritionDAO extends AbstractDAO<NutritionDAO> {
  private table: string = 'nutrition';

  @column()
  public id: string;

  @column()
  public weight: number;

  @column()
  public height: number;

  @column()
  public age: number;

  @column()
  public gender: string;

  @column()
  public user_id: string;

  @column()
  public created_at: Date;

  @column()
  public updated_at: Date;

  constructor(
    id: string,
    weight: number,
    height: number,
    age: number,
    gender: string,
    user_id: string,
    created_at: Date,
    updated_at: Date
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

  public getOne(id: string): Promise<NutritionDAO | undefined> {
    throw new Error('Method not implemented.');
  }
  public find(criteria: any): Promise<NutritionDAO[] | undefined> {
    throw new Error('Method not implemented.');
  }
  public async save(): Promise<void> {
    const query = this.insertQuery(this.table, this);
    console.log(query);
    throw new Error();
    await this.db.getConnection().query(query);
  }
  public update(entity: NutritionDAO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { column } from '../../../Shared/Infrastructure/Decorators/column';

export class FoodDAO extends AbstractDAO<FoodDAO> {
  protected table: string = 'food';

  @column() public id: string;
  @column() public food_name: string;
  @column() public serving_unit: string;
  @column() public qty: string;
  @column() public photo: string;
  @column() public kcal: string;
  @column() public carbohydrates: string;
  @column() public total_fat: string;
  @column() public satured_fat: string;
  @column() public cholesterol: string;
  @column() public sodium: string;
  @column() public protein: string;
  @column() public sugars: string;
  @column() public potasium: string;
  @column() public fiber: string;
  @column() public created_at: string | undefined;
  @column() public updated_at: string | undefined;

  constructor(
    public _id: string,
    public _food_name: string,
    public _serving_unit: string,
    public _qty: string,
    public _photo: string,
    public _kcal: string,
    public _carbohydrates: string,
    public _total_fat: string,
    public _satured_fat: string,
    public _cholesterol: string,
    public _sodium: string,
    public _protein: string,
    public _sugars: string,
    public _potasium: string,
    public _fiber: string,
    public _created_at: string,
    public _updated_at: string
  ) {
    super();
    this.id = _id;
    this.food_name = _food_name;
    this.serving_unit = _serving_unit;
    this.qty = _qty;
    this.photo = _photo;
    this.kcal = _kcal;
    this.carbohydrates = _carbohydrates;
    this.total_fat = _total_fat;
    this.satured_fat = _satured_fat;
    this.cholesterol = _cholesterol;
    this.sodium = _sodium;
    this.protein = _protein;
    this.sugars = _sugars;
    this.potasium = _potasium;
    this.fiber = _fiber;
    this.created_at = _created_at;
    this.updated_at = _updated_at;
  }

  public async getOne(relations?: string[]): Promise<FoodDAO | undefined> {
    throw new Error('Method not implemented.');
  }
  public async find(criteria: Criteria): Promise<FoodDAO[] | undefined> {
    const query = `SELECT * FROM ${this.table} ${criteria.toQuery()}`;
    const { rows } = await this.db.getConnection().query(query);

    if (!rows) {
      return undefined;
    }

    return rows.map((row: any) => {
      return new FoodDAO(
        row.id,
        row.food_name,
        row.serving_unit,
        row.qty,
        row.photo,
        row.kcal,
        row.carbohydrates,
        row.total_fat,
        row.satured_fat,
        row.cholesterol,
        row.sodium,
        row.protein,
        row.sugars,
        row.potasium,
        row.fiber,
        row.created_at,
        row.updated_at
      );
    });
  }
  public async save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async update(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

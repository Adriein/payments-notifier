import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../Shared/Infrastructure/Decorators/Orm/Column';
import { Model } from "../../../Shared/Infrastructure/Decorators/Orm/Model";

@Model('food')
export class FoodDAO extends AbstractDAO<FoodDAO> {
  @Column() public id: string;
  @Column() public food_name: string;
  @Column() public serving_unit: string;
  @Column() public qty: string;
  @Column() public photo: string;
  @Column() public kcal: string;
  @Column() public carbohydrates: string;
  @Column() public total_fat: string;
  @Column() public satured_fat: string;
  @Column() public cholesterol: string;
  @Column() public sodium: string;
  @Column() public protein: string;
  @Column() public sugars: string;
  @Column() public potasium: string;
  @Column() public fiber: string;
  @Column() public created_at: string | undefined;
  @Column() public updated_at: string | undefined;

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
}

import { AbstractDAO } from '../../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../../Shared/Infrastructure/Decorators/Orm/Column';
import { MealDAO } from './Meal.dao';
import { Model } from "../../../../Shared/Infrastructure/Decorators/Orm/Model";

@Model('diet')
export class DietDAO extends AbstractDAO<DietDAO> {
  @Column() public id: string | undefined;
  @Column() public diet_name: string | undefined;
  @Column() public objective: string | undefined;
  @Column() public kcal: number | undefined;
  @Column() public nutrition_id: string | undefined;
  @Column() public created_at: string | undefined;
  @Column() public updated_at: string | undefined;
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
}

import { AbstractDAO } from '../../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../../Shared/Infrastructure/Decorators/Orm/Column';
import { Model } from "../../../../Shared/Infrastructure/Decorators/Orm/Model";

@Model('meal')
export class MealDAO extends AbstractDAO<MealDAO> {
  @Column() public id: string | undefined;
  @Column() public meal_name: string | undefined;
  @Column() public diet_id: string | undefined;
  @Column() public created_at: string | undefined;
  @Column() public updated_at: string | undefined;

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
}

import { Criteria } from '../../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../../Shared/Infrastructure/Decorators/Orm/Column';
import { Model } from "../../../../Shared/Infrastructure/Decorators/Orm/Model";

@Model('nutrition')
export class NutritionDAO extends AbstractDAO<NutritionDAO> {
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
}

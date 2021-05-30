import { Diet } from '../../../Domain/Entities/Diet.entity';
import { GenericRepository } from './GenericRepository';
import { IDietRepository } from '../../../Domain/Interfaces/IDietRepository';
import { DietMapper } from '../Mappers/DietMapper';
import { CriteriaMapper } from '../Mappers/CriteriaMapper';
import { Log } from '../../../Domain/Decorators/Log';

export class DietRepository
  extends GenericRepository<Diet>
  implements IDietRepository
{
  constructor(
    protected entity: string,
    protected mapper: DietMapper,
    protected criteriaMapper: CriteriaMapper
  ) {
    super(entity, mapper, criteriaMapper);
  }

  @Log(process.env.LOG_LEVEL)
  override async findOne(userId: string): Promise<Diet | undefined> {
    const query = `
      SELECT diet.id as diet_id, diet.maxkcal, diet.user_id, diet_meal.id as diet_meal_id, diet_meal.name as diet_meal_name, food.id as food_id, food.name as food_name, food.quantity, food.ch, food.protein, food.fat, food.fiber, food.kcal 
      FROM ${this.entity} 
      LEFT JOIN diet_meal 
      ON diet.id = diet_meal.diet_id 
      LEFT JOIN meal_food 
      ON diet_meal.id = meal_food.meal_id
      LEFT join food
      ON meal_food.food_id = food.id
      WHERE diet.id = '${userId}'
    `;

    const { rows } = await this.db.query(query); 

    return this.mapper.domain(rows);
  }

}

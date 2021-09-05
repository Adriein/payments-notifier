import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { HttpApi } from '../../../Shared/Infrastructure/Data/HttpApi';
import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';
import { FoodApiMapper } from './FoodApiMapper';
import { NutritionixApiSearchResponse } from './NutritionixApiSearch.response.api';

export class NutritionixRepository extends HttpApi implements IFoodRepository {
  protected BASE_URL: string = 'https://trackapi.nutritionix.com/v2';
  private mapper = new FoodApiMapper();

  public async search(term: string): Promise<Food[]> {
    const searchQuery = `/search/instant?query=brez&locale=de_DE`;

    const { data, headers } = await this.get<NutritionixApiSearchResponse>(
      `/search/instant?query=${term}&locale=es_ES`,
      {
        headers: {
          'x-app-id': process.env.NUTRITIONIX_APPLICATION_ID,
          'x-app-key': process.env.NUTRITIONIX_API_KEY,
        },
      }
    );
    debug(data);

    throw new Error();
  }

  findOne(id: string): Promise<Food | undefined> {
    throw new Error('Method not implemented.');
  }

  find(adminId: string, criteria: Criteria): Promise<Food[]> {
    throw new Error('Method not implemented.');
  }

  save(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

import { HttpApi } from '../../../../Shared/Infrastructure/Data/HttpApi';
import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';
import { FoodApiMapper } from './FoodApiMapper';
import { FoodSearch, NutritionixApiSearchResponse } from './NutritionixApiSearch.response.api';
import { NutritionixApiNutrientsResponse } from './NutritionixApiNutrients.response.api';
import { NutritionixApiNutrientsRequest } from './NutritionixApiNutrients.request';
import { Collection } from '../../../../Shared/Domain/Entities/Collection';

export class NutritionixRepository extends HttpApi implements IFoodRepository {
  protected BASE_URL: string = 'https://trackapi.nutritionix.com/v2';
  private mapper = new FoodApiMapper();

  constructor() {
    super();
    this.setHeaders();
  }

  public async search(term: string, maxSearch: number = 5): Promise<Food[]> {
    const searchQuery = `/search/instant?query=${term}&locale=es_ES`;

    const { data: searchResponse } = await this.get<NutritionixApiSearchResponse>(searchQuery);

    const foods: Food[] = [];

    const results = new Collection<FoodSearch>(searchResponse.common).cut(maxSearch);

    for (const result of results.get()) {
      const { data: nutrientsResponse } = await this.post<NutritionixApiNutrientsResponse,
        NutritionixApiNutrientsRequest>('/natural/nutrients', { query: result.food_name, locale: 'es_ES' });

      const food = this.mapper.toDomain(nutrientsResponse.foods[0]);

      foods.push(food);
    }

    return foods;
  }

  findOne(id: string): Promise<Food | undefined> {
    throw new Error('Method not implemented.');
  }

  find(criteria: any): Promise<Food[]> {
    throw new Error('Method not implemented.');
  }

  save(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private setHeaders(): void {
    this.headers({
      'x-app-id': process.env.NUTRITIONIX_APPLICATION_ID,
      'x-app-key': process.env.NUTRITIONIX_API_KEY,
    });
  }
}

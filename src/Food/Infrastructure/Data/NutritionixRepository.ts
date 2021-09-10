import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { HttpApi } from '../../../Shared/Infrastructure/Data/HttpApi';
import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';
import { FoodApiMapper } from './FoodApiMapper';
import { NutritionixApiSearchResponse } from './NutritionixApiSearch.response.api';

export class NutritionixRepository extends HttpApi implements IFoodRepository {
  protected BASE_URL: string = 'https://trackapi.nutritionix.com/v2';
  private mapper = new FoodApiMapper();

  constructor() {
    super();
    this.setHeaders();
  }

  public async search(term: string): Promise<Food[]> {
    const searchQuery = `/search/instant?query=${term}&locale=es_ES`;

    const { data } = await this.get<NutritionixApiSearchResponse>(searchQuery);
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

  private getCommonFoodNutrients(): any {
    
  }

  private setHeaders(): void {
    this.headers({
      'x-app-id': process.env.NUTRITIONIX_APPLICATION_ID,
      'x-app-key': process.env.NUTRITIONIX_API_KEY,
    });
  }
}

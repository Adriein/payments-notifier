import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { HttpApi } from '../../../Shared/Infrastructure/Data/HttpApi';
import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';
import { FoodApiMapper } from './FoodApiMapper';
import { SpoonacularApiIngredientInformationResponse } from './SpoonacularApiIngredientInformation.response.api';
import { SpoonacularApiSearchResponse } from './SpoonacularApiSearch.response.api';

export class SpoonacularRepository extends HttpApi implements IFoodRepository {
  protected BASE_URL: string = ' https://api.spoonacular.com';
  private mapper = new FoodApiMapper();

  protected getAuth(): string {
      return `?apiKey=${process.env.SPOONACULAR_API_KEY}`
  }

  private limit(number: number): string {
      return `&number=${number}`;
  }

  private sort(by: string, direction: string = 'desc') {
    return `&sort=${by}&sortDirection=${direction}`;
  }

  public async search(term: string): Promise<Food[]> {
      const searchQuery = `/food/ingredients/search${this.getAuth()}&query=${term}${this.sort('calories')}`;
      

      const { data, headers } = await this.get<SpoonacularApiSearchResponse>(searchQuery);
      console.log(data);

      throw new Error();
      return await Promise.all(data.results.map(async ({ id }) => {
        const ingredientInfoQuery = `/food/ingredients/${id}/information${this.getAuth()}&amount=100`;

        const ingredient = await this.get<SpoonacularApiIngredientInformationResponse>(ingredientInfoQuery);

        return this.mapper.domain(ingredient);
      }));
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

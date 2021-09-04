import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { IHttpApi } from '../../Shared/Domain/Interfaces/IHttpApi';
import { Food } from '../Domain/Food.entity';
import { IFoodRepository } from '../Domain/IFoodRepository';
import { SearchFoodQuery } from '../Domain/Query/SearchFoodQuery';

export class SearchFoodHandler implements IHandler<Food[]> {
  constructor(
    private apiService: IHttpApi<Food[]>,
    private repository: IFoodRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SearchFoodQuery): Promise<Food[]> {
    const foods = await this.repository.search(query.searchTerm);

    if (foods.length) {
      return foods;
    }

    return await this.apiService.get(query.searchTerm);
  }
}

import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { Food } from '../Domain/Food.entity';
import { IFoodRepository } from '../Domain/IFoodRepository';
import { SearchFoodQuery } from '../Domain/Query/SearchFoodQuery';

export class SearchFoodHandler implements IHandler<Food[]> {
  constructor(
    private postgreRepository: IFoodRepository,
    private apiRepository: IFoodRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SearchFoodQuery): Promise<Food[]> {
    // const foods = await this.postgreRepository.search(query.searchTerm);

    // if (foods.length) {
    //   return foods;
    // }

    return await this.apiRepository.search(query.searchTerm);
  }
}

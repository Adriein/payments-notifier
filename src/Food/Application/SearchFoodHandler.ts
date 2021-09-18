import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { DomainEventsManager } from '../../Shared/Domain/Entities/DomainEventsManager';
import { ApiQueryDomainEvent } from '../Domain/ApiQueryDomainEvent';
import { Food } from '../Domain/Food.entity';
import { IFoodRepository } from '../Domain/IFoodRepository';
import { SearchFoodQuery } from '../Domain/Query/SearchFoodQuery';

export class SearchFoodHandler implements IHandler<Food[]> {
  private MAX_FOOD_SEARCH = 5;

  constructor(private postgreRepository: IFoodRepository, private apiRepository: IFoodRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SearchFoodQuery): Promise<Food[]> {
    const foodsInDb = await this.postgreRepository.search(query.searchTerm);

    if (foodsInDb.length) {
      return foodsInDb;
    }

    const foods = await this.apiRepository.search(query.searchTerm, this.MAX_FOOD_SEARCH);

    this.manageEvents(foods, query.userId);

    return foods;
  }

  private manageEvents([food]: Food[], userId: string): void {
    food.addEvent(new ApiQueryDomainEvent(food.id(), userId, this.MAX_FOOD_SEARCH + 1));

    DomainEventsManager.publishEvents(food.id());
  }
}

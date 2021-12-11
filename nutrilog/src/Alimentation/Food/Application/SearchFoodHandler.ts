import { Log } from '../../../Shared/Domain/Decorators/Log';
import { DomainEventsManager } from '../../../Shared/Domain/Entities/DomainEventsManager';
import { ApiQueryDomainEvent } from '../Domain/ApiQueryDomainEvent';
import { Food } from '../Domain/Food.entity';
import { IFoodRepository } from '../Domain/IFoodRepository';
import { SearchFoodQuery } from '../Domain/Query/SearchFoodQuery';
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { ID } from "../../../Shared/Domain/VO/Id.vo";

@QueryHandler(SearchFoodQuery)
export class SearchFoodHandler implements IHandler<Food[]> {
  private MAX_FOOD_SEARCH = 5;

  constructor(private postgreRepository: IFoodRepository, private apiRepository: IFoodRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SearchFoodQuery): Promise<Food[]> {
    const foodsInDb = await this.postgreRepository.search(query.searchTerm);

    if (foodsInDb.length) {
      return foodsInDb;
    }
    const adminId = new ID(query.adminId);
    const foods = await this.apiRepository.search(query.searchTerm, this.MAX_FOOD_SEARCH);

    await this.manageEvents(foods, adminId.value);

    return foods;
  }

  private async manageEvents([ food ]: Food[], adminId: string): Promise<void> {
    food.addEvent(new ApiQueryDomainEvent(food.id(), adminId, this.MAX_FOOD_SEARCH + 1));

    await DomainEventsManager.publishEvents(food.id());
  }
}

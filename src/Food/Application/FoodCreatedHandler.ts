import { DomainEventsManager } from '../../Shared/Domain/Entities/DomainEventsManager';
import { IDomainEventHandler } from '../../Shared/Domain/Interfaces/IDomainEventHandler';
import { FoodCreatedDomainEvent } from '../Domain/FoodCreatedDomainEvent';
import { IFoodRepository } from '../Domain/IFoodRepository';

export class FoodCreatedHandler implements IDomainEventHandler {
  constructor(private repository: IFoodRepository) {}

  public listen(): void {
    DomainEventsManager.subscribe(FoodCreatedDomainEvent, this.onFoodCreated);
  }

  private onFoodCreated = async (
    event: FoodCreatedDomainEvent
  ): Promise<void> => {
    await this.repository.save(event.food);
  };
}

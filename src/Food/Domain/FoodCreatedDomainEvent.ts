import { ID } from '../../Domain/VO/Id.vo';
import { DomainEvent } from '../../Shared/Domain/Entities/DomainEvent';
import { Food } from './Food.entity';

export class FoodCreatedDomainEvent extends DomainEvent {
  constructor(public aggregateId: ID, public food: Food) {
    super();
  }
}

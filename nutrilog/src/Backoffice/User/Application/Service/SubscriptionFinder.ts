import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { Subscription } from "../../Domain/Entity/Subscription.entity";

export class SubscriptionFinder {
  constructor(private readonly repository: ISubscriptionRepository) {}

  public async execute(id: ID): Promise<Subscription> {
    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}
import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { GetUserProfileQuery } from './GetUserProfileQuery';
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { UserFinder } from "../Service/UserFinder";
import { GetUserProfileResponse } from "./GetUserProfileResponse";

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler implements IHandler<GetUserProfileResponse> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly finder: UserFinder,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: GetUserProfileQuery): Promise<GetUserProfileResponse> {
    const user = await this.finder.execute(new ID(command.userId));

    const subscriptionList = await this.findSubscriptionsByUser(user.id());

    const presenter = new UserResponseBuilder(this.queryBus);
    return presenter.run(user, subscriptionList);
  }

  private async findSubscriptionsByUser(userId: ID): Promise<Subscription[]> {
    const criteria = new Criteria<SubscriptionFilter>();

    criteria.equal('userId', userId);

    const result = await this.subscriptionRepository.find(criteria);

    if (result.isLeft()) {
      throw result;
    }

    return result.value;
  }
}

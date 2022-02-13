import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { GetUserQuery } from '../../Domain/Query/GetUserQuery';
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { IUserRepository } from "../../Domain/IUserRepository";
import { FindUserResponse } from "./FindUserResponse";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { User } from "../../Domain/Entity/User.entity";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { SubscriptionFilter } from "../../Domain/SubscriptionFilter";

@QueryHandler(GetUserQuery)
export class GetUserProfileHandler implements IHandler<FindUserResponse> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: GetUserQuery): Promise<FindUserResponse> {
    const user = await this.findUser(command.userId);

    const subscriptionList = await this.findSubscriptionsByUser(user.id());

    const presenter = new UserResponseBuilder(this.queryBus);
    return presenter.run(user, subscriptionList);
  }

  private async findUser(id: string): Promise<User> {
    const userId = new ID(id);
    const result = await this.userRepository.findOne(userId.value);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
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

import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { UserDAO } from "./User.dao";
import { User } from "../../Domain/User.entity";
import { Password } from "../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { UserConfig } from "../../Domain/UserConfig.entity";
import { Subscription } from "../../Domain/Subscription.entity";
import { DateUtils } from "../../../Shared/Infrastructure/Helper/Date.utils";
import { SubscriptionDAO } from "./Subscription.dao";

export class UserMapper implements IMapper<User, UserDAO> {

  toDataModel(domain: User): UserDAO {
    const subscriptionDAO = new SubscriptionDAO(
      domain.subscriptionId(),
      domain.pricingId(),
      DateUtils.format(domain.paymentDate(), DateUtils.STANDARD_DATE_FORMAT),
      domain.isWarned(),
      domain.isNotified(),
      domain.id(),
      domain.isActive(),
      DateUtils.format(domain.subscriptionCreatedAt(), DateUtils.STANDARD_DATE_FORMAT),
      DateUtils.format(domain.subscriptionUpdatedAt(), DateUtils.STANDARD_DATE_FORMAT),
    );

    const userDAO = new UserDAO(
      domain.id(),
      domain.name(),
      domain.email(),
      domain.password(),
      domain.ownerId(),
      DateUtils.format(domain.createdAt(), DateUtils.STANDARD_DATE_FORMAT),
      DateUtils.format(domain.updatedAt(), DateUtils.STANDARD_DATE_FORMAT)
    );

    userDAO.subscriptions = [ subscriptionDAO ];

    return userDAO;
  }

  toDomain(dataModel: UserDAO): User {
    const p = {} as unknown as Subscription;
    return new User(
      new ID(dataModel.id!),
      dataModel.username!,
      new Password(dataModel.password!),
      new Email(dataModel.email!),
      UserConfig.build(),
      new ID(dataModel.owner_id!),
      p,
    );
  }

}
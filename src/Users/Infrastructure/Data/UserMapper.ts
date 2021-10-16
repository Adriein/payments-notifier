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
    const subscriptionDAO = new SubscriptionDAO();

    subscriptionDAO.id = domain.subscriptionId();
    subscriptionDAO.pricing_id = domain.pricingId();
    subscriptionDAO.payment_date = DateUtils.format(domain.paymentDate(), DateUtils.STANDARD_DATE_FORMAT);
    subscriptionDAO.warned = domain.isWarned();
    subscriptionDAO.notified = domain.isNotified();
    subscriptionDAO.user_id = domain.id();
    subscriptionDAO.active = domain.isActive();
    subscriptionDAO.created_at = DateUtils.format(domain.subscriptionCreatedAt(), DateUtils.STANDARD_DATE_FORMAT);
    subscriptionDAO.updated_at = DateUtils.format(domain.subscriptionUpdatedAt(), DateUtils.STANDARD_DATE_FORMAT);

    const userDAO = new UserDAO();

    userDAO.id = domain.id();
    userDAO.username = domain.name();
    userDAO.email = domain.email();
    userDAO.password = domain.password();
    userDAO.owner_id = domain.ownerId();
    userDAO.created_at = DateUtils.format(domain.createdAt(), DateUtils.STANDARD_DATE_FORMAT);
    userDAO.updated_at = DateUtils.format(domain.updatedAt(), DateUtils.STANDARD_DATE_FORMAT);

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
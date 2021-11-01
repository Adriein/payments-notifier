import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { UserDAO } from "./User.dao";
import { User } from "../../Domain/User.entity";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { UserConfig } from "../../Domain/UserConfig.entity";
import { Subscription } from "../../Domain/Subscription.entity";
import { DateUtils } from "../../../../Shared/Infrastructure/Helper/Date.utils";
import { SubscriptionDAO } from "./Subscription.dao";
import { UserConfigDAO } from "./UserConfig.dao";
import { LastPaymentDate } from "../../../../Shared/Domain/VO/LastPaymentDate.vo";

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

    const configDAO = new UserConfigDAO();

    configDAO.id = domain.configId();
    configDAO.role = domain.role();
    configDAO.language = domain.language();
    configDAO.user_id = domain.id();
    configDAO.send_notifications = domain.sendNotifications();
    configDAO.send_warnings = domain.sendWarnings();
    configDAO.created_at = DateUtils.format(domain.configCreatedAt(), DateUtils.STANDARD_DATE_FORMAT);
    configDAO.updated_at = DateUtils.format(domain.configUpdatedAt(), DateUtils.STANDARD_DATE_FORMAT);

    const userDAO = new UserDAO();

    userDAO.id = domain.id();
    userDAO.username = domain.name();
    userDAO.email = domain.email();
    userDAO.password = domain.password();
    userDAO.owner_id = domain.ownerId();
    userDAO.created_at = DateUtils.format(domain.createdAt(), DateUtils.STANDARD_DATE_FORMAT);
    userDAO.updated_at = DateUtils.format(domain.updatedAt(), DateUtils.STANDARD_DATE_FORMAT);

    userDAO.subscriptions = [ subscriptionDAO ];
    userDAO.userConfig = configDAO;

    return userDAO;
  }

  toDomain(dataModel: UserDAO): User {
    const [ subscriptionDAO ] = dataModel.subscriptions;

    const subscription = new Subscription(
      new ID(subscriptionDAO.id),
      new ID(subscriptionDAO.pricing_id),
      new LastPaymentDate(subscriptionDAO.payment_date.toString()),
      subscriptionDAO.warned,
      subscriptionDAO.notified,
      subscriptionDAO.active,
      new Date(subscriptionDAO.created_at),
      new Date(subscriptionDAO.updated_at)
    );

    const config = new UserConfig(
      new ID(dataModel.userConfig!.id),
      dataModel.userConfig!.language,
      dataModel.userConfig!.role,
      dataModel.userConfig!.send_notifications,
      dataModel.userConfig!.send_warnings
    );

    return new User(
      new ID(dataModel.id!),
      dataModel.username!,
      new Password(dataModel.password!),
      new Email(dataModel.email!),
      config,
      new ID(dataModel.owner_id!),
      subscription,
      new Date(dataModel.created_at),
      new Date(dataModel.updated_at)
    );
  }
}
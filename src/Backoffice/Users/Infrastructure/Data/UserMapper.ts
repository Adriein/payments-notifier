import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { User } from "../../Domain/User.entity";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { UserConfig } from "../../Domain/UserConfig.entity";
import { Subscription } from "../../Domain/Subscription.entity";
import { LastPaymentDate } from "../../../../Shared/Domain/VO/LastPaymentDate.vo";
import { IUserModel } from "./IUserModel";
import { Prisma } from "@prisma/client";

export class UserMapper implements IMapper<User, IUserModel> {

  toDataModel(entity: User): IUserModel {
    return {
      id: entity.id(),
      username: entity.name(),
      email: entity.email(),
      password: entity.password(),
      owner_id: entity.ownerId(),
      role_id: entity.roleId(),
      created_at: entity.createdAt(),
      updated_at: entity.updatedAt(),
    }
  }

  public toDomain(dataModel: IUserModel): User {
    const [ subscriptionModel ] = dataModel.subscriptions!;
    const subscription = new Subscription(
      new ID(subscriptionModel.id),
      new ID(subscriptionModel.pricing_id),
      new LastPaymentDate(subscriptionModel.payment_date.toString()),
      subscriptionModel.warned,
      subscriptionModel.notified,
      subscriptionModel.active,
      subscriptionModel.expired,
      new Date(subscriptionModel.created_at),
      new Date(subscriptionModel.updated_at)
    );

    const config = new UserConfig(
      new ID(dataModel.config!.id),
      dataModel.config!.language,
      dataModel.config!.send_notifications,
      dataModel.config!.send_warnings
    );

    return new User(
      new ID(dataModel.id!),
      dataModel.username!,
      new Password(dataModel.password!),
      new Email(dataModel.email!),
      config,
      new ID(dataModel.owner_id!),
      dataModel.role.id,
      subscription,
      new Date(dataModel.created_at),
      new Date(dataModel.updated_at)
    );
  }
}
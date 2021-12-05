import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { User } from "../../Domain/Entity/User.entity";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { UserConfig } from "../../Domain/Entity/UserConfig.entity";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { LastPaymentDate } from "../../../../Shared/Domain/VO/LastPaymentDate.vo";
import { Prisma } from "@prisma/client";

export class UserMapper implements IMapper<User, Prisma.userCreateInput | Prisma.userUpdateInput> {
  toSaveDataModel<C extends Prisma.userCreateInput>(domain: User): Prisma.userCreateInput {
    return {
      id: domain.id(),
      username: domain.name(),
      email: domain.email(),
      password: domain.password(),
      owner_id: domain.ownerId(),
      active: domain.isActive(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      role: {
        connect: {
          id: domain.roleId(),
        }
      },
      config: {
        create: {
          id: domain.configId(),
          send_warnings: domain.sendWarnings(),
          send_notifications: domain.sendNotifications(),
          language: domain.language(),
          created_at: new Date(),
          updated_at: new Date()
        }
      },
      subscriptions: {
        create: {
          id: domain.subscriptionId(),
          pricing_id: domain.pricingId(),
          active: domain.isSubscriptionActive(),
          expired: false,
          warned: domain.isWarned(),
          notified: domain.isNotified(),
          payment_date: domain.paymentDate(),
          created_at: new Date(),
          updated_at: new Date()
        }
      }
    }
  }

  toUpdateDataModel<C extends Prisma.userUpdateInput>(domain: User): Prisma.userUpdateInput {
    return {
      username: domain.name(),
      email: domain.email(),
      password: domain.password(),
      owner_id: domain.ownerId(),
      active: domain.isActive(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      role: {
        connect: {
          id: domain.roleId(),
        }
      },
      config: {
        create: {
          id: domain.configId(),
          send_warnings: domain.sendWarnings(),
          send_notifications: domain.sendNotifications(),
          language: domain.language(),
          created_at: new Date(),
          updated_at: new Date()
        }
      },
      subscriptions: {
        create: {
          id: domain.subscriptionId(),
          pricing_id: domain.pricingId(),
          active: domain.isSubscriptionActive(),
          expired: false,
          warned: domain.isWarned(),
          notified: domain.isNotified(),
          payment_date: domain.paymentDate(),
          created_at: new Date(),
          updated_at: new Date()
        }
      }
    }
  }

  public toDomain(dataModel: any): User {
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
      dataModel.active,
      dataModel.app_config ? new ID(dataModel.app_config.id) : undefined,
      new Date(dataModel.created_at),
      new Date(dataModel.updated_at)
    );
  }
}
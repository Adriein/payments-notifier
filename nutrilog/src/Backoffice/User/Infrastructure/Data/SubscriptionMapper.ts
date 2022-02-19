import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Prisma } from "@prisma/client";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";

export class SubscriptionMapper implements IMapper<Subscription, Prisma.subscriptionCreateInput | Prisma.subscriptionUpdateInput> {
  toSaveDataModel<C extends Prisma.userCreateInput>(domain: Subscription): Prisma.subscriptionCreateInput {
    return {
      id: domain.id().value,
      valid_to: domain.validTo(),
      warned: domain.isWarned(),
      notified: domain.isNotified(),
      active: domain.isActive(),
      expired: domain.isExpired(),
      payment_date: domain.paymentDate(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      pricing: {
        connect: {
          id: domain.pricingId()
        }
      },
      user: {
        connect: {
          id: domain.userId().value
        }
      }
    }
  }

  toUpdateDataModel<C extends Prisma.userUpdateInput>(domain: Subscription): Prisma.subscriptionUpdateInput {
    return {
      id: domain.id().value,
      valid_to: domain.validTo(),
      warned: domain.isWarned(),
      notified: domain.isNotified(),
      active: domain.isActive(),
      expired: domain.isExpired(),
      payment_date: domain.paymentDate(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      pricing: {
        connect: {
          id: domain.pricingId()
        }
      },
      user: {
        connect: {
          id: domain.userId().value
        }
      }
    }
  }

  public toDomain(dataModel: any): Subscription {
    return new Subscription(
      new ID(dataModel.id!),
      new ID(dataModel.user_id!),
      new ID(dataModel.pricing_id!),
      new DateVo(dataModel.payment_date!),
      new DateVo(dataModel.valid_to!),
      dataModel.warned!,
      dataModel.notified!,
      dataModel.active!,
      dataModel.expired!,
      new Date(dataModel.created_at),
      new Date(dataModel.updated_at)
    );
  }
}
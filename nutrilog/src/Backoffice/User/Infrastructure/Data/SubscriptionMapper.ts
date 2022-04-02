import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Prisma } from "@prisma/client";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { SubscriptionHistory } from "../../Domain/Entity/SubscriptionHistory.entity";
import { SubscriptionHistoryCollection } from "../../Domain/Entity/SubscriptionHistoryCollection";

export class SubscriptionMapper implements IMapper<Subscription, Prisma.subscriptionCreateInput | Prisma.subscriptionUpdateInput> {
  public toSaveDataModel<C extends Prisma.userCreateInput>(domain: Subscription): Prisma.subscriptionCreateInput {
    return {
      id: domain.id().value,
      valid_to: domain.validTo(),
      active: domain.isActive(),
      expired: domain.isExpired(),
      payment_date: domain.paymentDate(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      history: {
        connectOrCreate: this.subscriptionHistoryCreate(domain)
      },
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

  public toUpdateDataModel<C extends Prisma.userUpdateInput>(domain: Subscription): Prisma.subscriptionUpdateInput {
    return {
      id: domain.id().value,
      valid_to: domain.validTo(),
      active: domain.isActive(),
      expired: domain.isExpired(),
      payment_date: domain.paymentDate(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      history: {
        connectOrCreate: this.subscriptionHistoryCreate(domain)
      },
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
      dataModel.active!,
      dataModel.expired!,
      this.subscriptionHistoryToDomain(dataModel.history),
      new Date(dataModel.created_at),
      new Date(dataModel.updated_at)
    );
  }

  private subscriptionHistoryToDomain(historyDataModelList: any): SubscriptionHistoryCollection {
    const history = historyDataModelList.map((historyDataModel: any) => {
      return new SubscriptionHistory(
        new ID(historyDataModel.id),
        historyDataModel.event,
        historyDataModel.created_at,
        historyDataModel.updated_at,
      );
    });
    return new SubscriptionHistoryCollection(history);
  }

  private subscriptionHistoryCreate(domain: Subscription) {
    return domain.history().data().map((history: SubscriptionHistory) => {
      return {
        create: {
          id: history.id().value,
          event: history.event(),
          created_at: history.createdAt(),
          updated_at: history.updatedAt()
        },
        where: {
          id: history.id().value
        }
      }
    });
  }
}
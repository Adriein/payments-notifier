import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { AppConfig } from "../Domain/AppConfig.entity";
import { Prisma } from "@prisma/client";
import { ID } from "../../../Shared/Domain/VO/Id.vo";

export class AppConfigMapper implements IMapper<AppConfig, Prisma.app_configCreateInput | Prisma.app_configUpdateInput> {
  public toDomain(dataModel: Prisma.app_configWhereInput): AppConfig {
    return new AppConfig(
      new ID(dataModel.id! as string),
      dataModel.warning_delay! as number,
      dataModel.notification_delay! as number,
      dataModel.email_content! as string,
      dataModel.last_sent_report! as Date,
      new ID(dataModel.user_id! as string),
      dataModel.created_at! as Date,
      dataModel.updated_at! as Date,
    );
  }

  toSaveDataModel<C extends Prisma.app_configCreateInput>(domain: AppConfig): Prisma.app_configCreateInput {
    return {
      id: domain.id(),
      warning_delay: domain.warningDelay(),
      notification_delay: domain.notificationDelay(),
      last_sent_report: domain.lastSentReport(),
      email_content: domain.emailContent(),
      user: {
        connect: {
          id: domain.userId().value
        }
      },
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt()
    }
  }

  toUpdateDataModel(domain: AppConfig): Prisma.app_configUpdateInput {
    throw new Error('not implemented yet');
  }

}
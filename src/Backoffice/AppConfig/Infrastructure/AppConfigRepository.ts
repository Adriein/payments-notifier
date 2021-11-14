import { IAppConfigRepository } from "../Domain/IAppConfigRepository";
import { AppConfig } from "../Domain/AppConfig.entity";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { PrismaClient } from "@prisma/client";
import { Log } from "../../../Shared/Domain/Decorators/Log";

export class AppConfigRepository implements IAppConfigRepository {
  delete(entity: AppConfig): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria?: Criteria): Promise<AppConfig[]> {
    return Promise.resolve([]);
  }

  findOne(id: string): Promise<AppConfig | undefined> {
    return Promise.resolve(undefined);
  }
  
  @Log(process.env.LOG_LEVEL)
  public async save(entity: AppConfig): Promise<void> {
    const prisma = new PrismaClient();
    try {
      await prisma.app_config.create({
        data: {
          id: entity.id(),
          warning_delay: entity.warningDelay(),
          notification_delay: entity.notificationDelay(),
          last_sent_report: entity.lastSentReport(),
          email_content: entity.emailContent(),
          user_id: entity.userId().value,
          created_at: entity.createdAt(),
          updated_at: entity.updatedAt()
        }
      })
      prisma.$disconnect();
    } catch (error) {
      prisma.$disconnect();
      throw error;
    }
  }

  update(entity: AppConfig): Promise<void> {
    return Promise.resolve(undefined);
  }

}
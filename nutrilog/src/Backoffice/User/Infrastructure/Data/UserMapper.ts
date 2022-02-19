import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { User } from "../../Domain/Entity/User.entity";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { UserConfig } from "../../Domain/Entity/UserConfig.entity";
import { Prisma } from "@prisma/client";

export class UserMapper implements IMapper<User, Prisma.userCreateInput | Prisma.userUpdateInput> {
  toSaveDataModel<C extends Prisma.userCreateInput>(domain: User): Prisma.userCreateInput {
    return {
      id: domain.id().value,
      username: domain.name(),
      email: domain.email(),
      password: domain.password(),
      owner_id: domain.tenantId(),
      active: domain.isActive(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      role: {
        connect: {
          id: domain.roleId().value,
        }
      },
      config: {
        create: {
          id: domain.configId().value,
          send_warnings: domain.sendWarnings(),
          send_notifications: domain.sendNotifications(),
          language: domain.language(),
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
      owner_id: domain.tenantId(),
      active: domain.isActive(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      role: {
        connect: {
          id: domain.roleId().value,
        }
      },
      config: {
        create: {
          id: domain.configId().value,
          send_warnings: domain.sendWarnings(),
          send_notifications: domain.sendNotifications(),
          language: domain.language(),
          created_at: new Date(),
          updated_at: new Date()
        }
      }
    }
  }

  public toDomain(dataModel: any): User {
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
      dataModel.active,
      dataModel.app_config ? new ID(dataModel.app_config.id) : undefined,
      new Date(dataModel.created_at),
      new Date(dataModel.updated_at)
    );
  }
}
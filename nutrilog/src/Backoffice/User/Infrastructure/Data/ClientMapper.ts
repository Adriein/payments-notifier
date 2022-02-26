import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { UserConfig } from "../../Domain/Entity/UserConfig.entity";
import { Prisma } from "@prisma/client";
import { Client } from "../../Domain/Entity/Client.entity";

export class ClientMapper implements IMapper<Client, Prisma.userCreateInput | Prisma.userUpdateInput> {
  toSaveDataModel<C extends Prisma.userCreateInput>(domain: Client): Prisma.userCreateInput {
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

  toUpdateDataModel<C extends Prisma.userUpdateInput>(domain: Client): Prisma.userUpdateInput {
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

  public toDomain(dataModel: any): Client {
    const config = new UserConfig(
      new ID(dataModel.config!.id),
      dataModel.config!.language,
      dataModel.config!.send_notifications,
      dataModel.config!.send_warnings
    );

    return new Client(
      new ID(dataModel.id!),
      dataModel.username!,
      new Password(dataModel.password!),
      new Email(dataModel.email!),
      config,
      new ID(dataModel.owner_id!),
      dataModel.role.id,
      dataModel.active,
      new Date(dataModel.created_at),
      new Date(dataModel.updated_at)
    );
  }
}
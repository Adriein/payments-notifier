import { IAuthRepository } from "../../Domain/IAuthRepository";
import { Auth } from "../../Domain/Auth.entity";
import { AuthMapper } from "./AuthMapper";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { PrismaClient } from "@prisma/client";
import { IAuthModel } from "./IAuthModel";
import Database from "../../../Infraestructure/Data/Database";

export class AuthRepository implements IAuthRepository {
  private mapper: AuthMapper = new AuthMapper();
  private prisma = Database.getInstance().getConnection();

  public async delete(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(criteria: Criteria): Promise<Auth[]> {
    return Promise.resolve([]);
  }

  public async findOne(id: string): Promise<Auth | undefined> {
    return Promise.resolve(undefined);
  }

  public async save(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async update(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findByEmail(email: string): Promise<Auth | undefined> {
    const result = await this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        config: true,
        subscriptions: true,
        role: true
      }
    }) as unknown as IAuthModel;

    this.prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

}
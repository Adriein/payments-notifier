import { IAuthRepository } from "../../Domain/IAuthRepository";
import { Auth } from "../../Domain/Auth.entity";
import { AuthMapper } from "./AuthMapper";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { PrismaClient } from "@prisma/client";
import { IAuthModel } from "./IAuthModel";

export class AuthRepository implements IAuthRepository {
  private mapper: AuthMapper = new AuthMapper();

  public async delete(id: string): Promise<void> {
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
    const prisma = new PrismaClient();

    const result = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        config: true,
        subscriptions: true,
        role: true
      }
    }) as unknown as IAuthModel;

    prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

}
import { IAuthRepository } from "../../Domain/IAuthRepository";
import { Auth } from "../../Domain/Auth.entity";
import { AuthMapper } from "./AuthMapper";
import Database from "../../../Shared/Infrastructure/Data/Database";
import { Either } from "../../../Shared/Domain/types";
import { Left } from "../../../Shared/Domain/Entities/Left";
import { Right } from "../../../Shared/Domain/Entities/Right";
import { NotRegisteredError } from "../../Domain/NotRegisteredError";

export class AuthRepository implements IAuthRepository {
  private mapper: AuthMapper = new AuthMapper();
  private prisma = Database.instance().connection();

  public async delete(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(criteria: any): Promise<Either<Error, Auth[]>> {
    throw new Error('not implemented');
  }

  public async findOne(id: string): Promise<Either<Error, Auth>> {
    const result = await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        config: true,
        subscriptions: true,
        role: true
      }
    });

    this.prisma.$disconnect();

    if (!result) {
      Left.error(new NotRegisteredError());
    }

    return Right.success(this.mapper.toDomain(result));
  }

  public async save(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async update(entity: Auth): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: entity.id()
      },
      data: {
        password: entity.password()
      }
    });

    this.prisma.$disconnect();
  }

  public async findByEmail(email: string): Promise<Either<NotRegisteredError | Error, Auth>> {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          email
        },
        include: {
          config: true,
          subscriptions: true,
          role: true
        }
      });

      this.prisma.$disconnect();

      if (!result) {
        Left.error(new NotRegisteredError());
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error: any) {
      return Left.error(error);
    }
  }
}
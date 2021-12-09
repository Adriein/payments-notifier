import { IRoleRepository } from "../Domain/IRoleRepository";
import { Role } from "../Domain/Role";
import { RoleMapper } from "./RoleMapper";
import Database from "../../../Shared/Infrastructure/Data/Database";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { Either } from "../../../Shared/Domain/types";
import { Left } from "../../../Shared/Domain/Entities/Left";
import { Right } from "../../../Shared/Domain/Entities/Right";

export class RoleRepository implements IRoleRepository {
  private mapper = new RoleMapper();
  private prisma = Database.instance().connection();

  delete(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria?: any): Promise<Either<Error, Role[]>> {
    throw new Error('not implemented yet');
  }

  findOne(id: string): Promise<Either<Error, Role>> {
    throw new Error('not implemented yet');
  }

  save(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  @Log(process.env.LOG_LEVEL)
  public async search(role: string): Promise<Either<Error, Role[]>> {
    try {
      const results = await this.prisma.role.findMany({ where: { type: role } });

      return Right.success(results.map((result) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  update(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

}
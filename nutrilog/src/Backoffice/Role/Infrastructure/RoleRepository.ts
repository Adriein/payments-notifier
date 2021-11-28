import { IRoleRepository } from "../Domain/IRoleRepository";
import { Role } from "../Domain/Role";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { RoleMapper } from "./RoleMapper";
import Database from "../../../Shared/Infrastructure/Data/Database";
import { Log } from "../../../Shared/Domain/Decorators/Log";

export class RoleRepository implements IRoleRepository {
  private mapper = new RoleMapper();
  private prisma = Database.instance().connection();

  delete(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria?: Criteria): Promise<Role[]> {
    return Promise.resolve([]);
  }

  findOne(id: string): Promise<Role | undefined> {
    return Promise.resolve(undefined);
  }

  save(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  @Log(process.env.LOG_LEVEL)
  public async search(role: string): Promise<Role | undefined> {
    try {
      const [ result ] = await this.prisma.role.findMany({ where: { type: role } });

      return this.mapper.toDomain(result);
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  update(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

}
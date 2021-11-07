import { IRoleRepository } from "../Domain/IRoleRepository";
import { Role } from "../Domain/Role";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { PrismaClient } from "@prisma/client";
import { RoleMapper } from "./RoleMapper";

export class RoleRepository implements IRoleRepository {
  private mapper = new RoleMapper();
  
  delete(id: string): Promise<void> {
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

  public async search(role: string): Promise<Role | undefined> {
    const prisma = new PrismaClient();
    try {
      const [ result ] = await prisma.role.findMany({ where: { type: role } });

      return this.mapper.toDomain(result);
    } catch (error) {
      prisma.$disconnect();
      throw error;
    }
  }

  update(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

}
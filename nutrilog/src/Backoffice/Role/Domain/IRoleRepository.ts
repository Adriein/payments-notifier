import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Role } from "./Role";

export interface IRoleRepository extends IRepository<Role> {
  search(role: string): Promise<Role | undefined>;
}
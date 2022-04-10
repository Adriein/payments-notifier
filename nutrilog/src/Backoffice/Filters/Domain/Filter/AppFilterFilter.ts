import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export interface AppFilterFilter {
  tenantId: ID,
  entity: string;
}
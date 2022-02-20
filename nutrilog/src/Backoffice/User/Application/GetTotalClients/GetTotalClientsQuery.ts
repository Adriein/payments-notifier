import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";

export class GetTotalClientsQuery implements IQuery {
  constructor(public tenantId: string) {}
}
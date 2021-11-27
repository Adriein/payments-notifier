import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";

export class GetAppConfigQuery implements IQuery {
  public constructor(public id: string) {}
}
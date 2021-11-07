import { IQuery } from "../../../Shared/Domain/Interfaces/IQuery";

export class SearchRoleQuery implements IQuery {
  public constructor(public role: string) {
  }
}
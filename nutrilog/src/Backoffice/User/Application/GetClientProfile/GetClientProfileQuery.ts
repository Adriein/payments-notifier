import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";


export class GetClientProfileQuery implements IQuery {
  constructor(public userId: string) {
  };
}

import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";


export class GetUserQuery implements IQuery {
  constructor(public userId: string) {
  };
}

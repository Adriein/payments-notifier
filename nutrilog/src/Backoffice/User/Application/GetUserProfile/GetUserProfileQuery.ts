import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";


export class GetUserProfileQuery implements IQuery {
  constructor(public userId: string) {
  };
}

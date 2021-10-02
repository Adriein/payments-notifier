import { BaseEntity } from "../../Domain/Entities/BaseEntity";
import { ID } from "../../Shared/Domain/VO/Id.vo";

export class UserConfig extends BaseEntity {
  constructor(
    _id: ID,
    private _lang: string,
    private _role: string,
    private _sendNotifications: boolean = false,
    private _sendWarnings: boolean = false,
  ) {
    super(_id, new Date(), new Date());
  }

  public lang(): string {
    return this._lang;
  }

  public role(): string {
    return this._role;
  }

  public sendNotifications(): boolean {
    return this._sendNotifications;
  }

  public sendWarnings(): boolean {
    return this._sendWarnings;
  }
}

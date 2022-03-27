import { BaseEntity } from "../../../../Shared/Domain/Entities/BaseEntity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { LANG_ES } from "../constants";

export class UserConfig extends BaseEntity {
  public static build(sendNotifications: boolean = false, sendWarnings: boolean = false) {
    return new UserConfig(ID.generate(), LANG_ES, sendNotifications, sendWarnings);
  }

  constructor(
    _id: ID,
    private _lang: string,
    private _sendNotifications: boolean = false,
    private _sendWarnings: boolean = false,
  ) {
    super(_id, new Date(), new Date());
  }

  public lang(): string {
    return this._lang;
  }

  public sendNotifications(): boolean {
    return this._sendNotifications;
  }

  public sendWarnings(): boolean {
    return this._sendWarnings;
  }

  public activateWarnings(): void {
    this._sendWarnings = true;
    this.entityUpdated()
  }

  public deactivateWarnings(): void {
    this._sendWarnings = false;
    this.entityUpdated()
  }

  public activateNotifications(): void {
    this._sendNotifications = true;
    this.entityUpdated()
  }

  public deactivateNotifications(): void {
    this._sendNotifications = false;
    this.entityUpdated()
  }

  public changeLanguage(language: string): void {
    this._lang = language
  }
}

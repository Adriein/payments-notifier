import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class UpdateUserNotificationsCommand implements ICommand {
  constructor(public id: string, public sendWarnings: string) {
  }
}
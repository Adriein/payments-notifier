import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class UpdateUserPasswordCommand implements ICommand {
  constructor(public userId: string, public oldPassword: string, public newPassword: string) {}
}
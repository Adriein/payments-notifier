import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class UpdatePasswordCommand implements ICommand {
  constructor(public userId: string, public oldPassword: string, public newPassword: string) {}
}
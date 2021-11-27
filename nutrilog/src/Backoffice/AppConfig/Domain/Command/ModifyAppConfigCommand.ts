import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class ModifyAppConfigCommand implements ICommand {
  constructor(public warningDelay: string, public emailContent: string, public adminId: string) {}
}

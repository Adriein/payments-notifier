import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class SendContactEmailCommand implements ICommand {
  constructor(
    public email: string,
    public emailContent: string,
    public subject: string,
  ) {}
}
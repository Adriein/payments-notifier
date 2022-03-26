import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class UpdateClientCommand implements ICommand {
  constructor(
    public username: string,
    public email: string,
    public notifications: string,
    public warnings: number,
    public language: string,
    public rol: string,
    public tenantId: string,
  ) {}
}
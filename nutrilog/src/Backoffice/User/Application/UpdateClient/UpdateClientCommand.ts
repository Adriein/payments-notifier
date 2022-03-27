import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class UpdateClientCommand implements ICommand {
  constructor(
    public clientId: string,
    public username: string,
    public email: string,
    public notifications: boolean,
    public warnings: boolean,
    public language: string,
    public rol: string,
    public tenantId: string,
  ) {}
}
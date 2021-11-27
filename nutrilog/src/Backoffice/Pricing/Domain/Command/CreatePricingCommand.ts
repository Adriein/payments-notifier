import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class CreatePricingCommand implements ICommand {
  constructor(public name: string, public duration: number, public amount: number, public adminId: string) {}
}
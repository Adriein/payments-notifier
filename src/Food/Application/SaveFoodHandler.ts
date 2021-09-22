import { IHandler } from "../../Domain/Interfaces";
import { ICommand } from "../../Shared/Domain/Interfaces/ICommand";

export class SaveFoodHandler implements IHandler<void> {
  public async handle(command: ICommand): Promise<void> {

  }

}
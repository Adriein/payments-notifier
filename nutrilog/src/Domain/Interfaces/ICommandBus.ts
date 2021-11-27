import { ICommand } from "../../Shared/Domain/Interfaces/ICommand";


export interface ICommandBus {
  execute(command: ICommand): Promise<any>;
}

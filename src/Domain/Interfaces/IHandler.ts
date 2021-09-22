import {ICommand} from "../../Shared/Domain/Interfaces/ICommand";

export interface IHandler<T> {
  handle(command: ICommand): Promise<T>;
}

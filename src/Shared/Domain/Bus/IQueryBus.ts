import { ICommand } from "./ICommand";

export interface IQueryBus<T> {
  execute(command: ICommand): Promise<T>;
}

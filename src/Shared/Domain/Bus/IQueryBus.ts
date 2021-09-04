import { ICommand } from "./ICommand";

export interface IQueryBus<T> {
  ask(command: ICommand): Promise<T>;
}

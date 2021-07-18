import { ICommand } from "./ICommand";

export interface IQueryBus<T> {
  dispatch(command: ICommand): Promise<T>;
}

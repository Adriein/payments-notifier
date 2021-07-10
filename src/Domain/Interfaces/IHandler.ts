import { ICommand } from '../../Shared/Domain/Bus/ICommand';

export interface IHandler<T> {
  handle(command: ICommand): Promise<T>;
}

import { ICommand } from '../Interfaces/ICommand';

export interface ICommandBus {
  dispatch(command: ICommand): Promise<any>;
}

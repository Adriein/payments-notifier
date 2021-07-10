import { ICommand } from '../../Shared/Domain/Bus/ICommand';

export interface ICommandBus {
  execute(command: ICommand): Promise<any>;
}

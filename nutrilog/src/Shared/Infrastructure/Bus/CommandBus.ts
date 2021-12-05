import { ICommandBus } from '../../Domain/Bus/ICommandBus';
import { CommandClass, ConstructorFunc } from '../../Domain/types';
import { ICommand } from "../../Domain/Interfaces/ICommand";
import { IHandler } from "../../Domain/Interfaces/IHandler";

export class CommandBus implements ICommandBus {
  private static _instance: CommandBus;
  private static handlers: Map<string, IHandler<void>> = new Map();

  private constructor() {}

  public static instance(): CommandBus {
    if (!CommandBus._instance) {
      CommandBus._instance = new CommandBus();
    }

    return CommandBus._instance;
  }

  public static bind = (command: CommandClass, handler: IHandler<void>) => {
    CommandBus.handlers.set(command.name, handler);
  };

  public async dispatch(command: ICommand): Promise<void> {
    return await this.resolve(command).handle(command);
  }

  private resolve(command: ICommand): IHandler<void> {
    const handler = CommandBus.handlers.get(command.constructor.name);

    if (!handler) {
      throw new Error('No handler bound');
    }

    return handler;
  }
}

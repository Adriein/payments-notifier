import { COMMANDS_HANDLER_METADATA } from '../constants';
import { ICommand } from '../Interfaces/ICommand';

export const CommandHandler = (...commands: ICommand[]): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(COMMANDS_HANDLER_METADATA, commands, target);
  };
};

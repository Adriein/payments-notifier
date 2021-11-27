import { QUERY_HANDLER_METADATA } from '../constants';
import { IQuery } from '../Interfaces/IQuery';

export const QueryHandler = (...commands: IQuery[]): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(QUERY_HANDLER_METADATA, commands, target);
  };
};

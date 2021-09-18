import { EVENTS_HANDLER_METADATA } from '../constants';
import { DomainEventsManager } from '../Entities/DomainEventsManager';
import { IDomainEventHandler } from '../Interfaces/IDomainEventHandler';
import { ConstructorFunc, DomainEventClass } from '../types';



export const DomainEventsHandler = (...events: DomainEventClass[]): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(EVENTS_HANDLER_METADATA, events, target);
    events.forEach((event: DomainEventClass) => {
      const handlerClass = target as ConstructorFunc;
      const handler = {} as IDomainEventHandler;
      DomainEventsManager.subscribe(event, handler);
    });
  };
};

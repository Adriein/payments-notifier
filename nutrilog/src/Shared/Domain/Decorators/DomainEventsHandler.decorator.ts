import { EVENTS_HANDLER_METADATA } from '../constants';
import { DomainEventClass } from '../types';

export const DomainEventsHandler = (...events: DomainEventClass[]): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(EVENTS_HANDLER_METADATA, events, target);
  };
};

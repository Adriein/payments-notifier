import { DomainEvent } from "./Entities/DomainEvent";
import { ICommand } from "./Interfaces/ICommand";
import { IQuery } from "./Interfaces/IQuery";

export type PricingObject = {
  [key: string]: { duration: number; price: number };
};

export type CriteriaObject = {
  [key: string]: { value: string; operation: string };
};

export type Counter = { [key: string]: number };

export type NutritionPlan = {
  bulk: 'bulk';
  cut: 'cut';
  mantinence: 'mantinence';
};

export type GenderType = {
  male: 'male';
  female: 'female';
};

export type BindCommandHandler<T> = {
  [key: string]: T;
};

export type ConstructorFunc<T = any> = {
  new (...args: any[]): T;
};

export type DomainEventClass = new (...args: never[]) => DomainEvent;

export type CommandClass = new (...args: never[]) => ICommand;
export type QueryClass = new (...args: never[]) => IQuery;

import { DomainEvent } from "./Entities/DomainEvent";
import { ICommand } from "./Interfaces/ICommand";
import { IQuery } from "./Interfaces/IQuery";
import { Left } from "./Entities/Left";
import { Right } from "./Entities/Right";

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
  new(...args: any[]): T;
};

export type JSObject = {
  [key: string]: any
}

export type Nullable<T> = T | undefined | null;

export type DomainEventClass = new (...args: never[]) => DomainEvent;

export type CommandClass = new (...args: never[]) => ICommand;
export type QueryClass = new (...args: never[]) => IQuery;

export type RelationMetadata = { prop: string, refTable: string, refPropName: string, dao: ConstructorFunc, type: string }
export type ColumnMetadata = { name: string, type: string }

export type GetReturnType<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? ReturnType<T[K]> : never;
}[keyof T];

export type Either<L, R> = Left<L, R> | Right<L, R>;
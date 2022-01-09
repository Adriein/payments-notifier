import { DomainEvent } from "./Entities/DomainEvent";
import { ICommand } from "./Interfaces/ICommand";
import { IQuery } from "./Interfaces/IQuery";
import { Left } from "./Entities/Left";
import { Right } from "./Entities/Right";

export type Counter = { [key: string]: number };

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

export type Either<L, R> = Left<L, R> | Right<L, R>;

export type KeyReturnType<T> = {
  [K in keyof T]: T[K];
}[keyof T];

export type Model = {
  [key: string]: ModelSchema;
}

export type ModelSchema = { field: string, type: string, joinType?: string }
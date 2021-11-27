import { IQuery } from "../Interfaces/IQuery";

export interface IQueryBus<T> {
  ask<C = null>(query: IQuery): C extends null ? Promise<T> : Promise<C>;
}

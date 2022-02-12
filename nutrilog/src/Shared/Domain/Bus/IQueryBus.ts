import { IQuery } from "../Interfaces/IQuery";

export interface IQueryBus {
  ask<T>(query: IQuery): Promise<T>;
}

import { IQuery } from "../Interfaces/IQuery";

export interface IQueryBus<T> {
  ask(query: IQuery): Promise<T>;
}

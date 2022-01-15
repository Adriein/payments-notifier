import { Model } from "../../Domain/types";
import { PropertyNotDefinedInModelError } from "./PropertyNotDefinedInModelError";

export abstract class MysqlMapper {
  protected abstract filterableColumnsMapping: Model;

  public get<K extends keyof Model>(prop: K): Model[K] {
    if (!this.filterableColumnsMapping.hasOwnProperty(prop)) {
      throw new PropertyNotDefinedInModelError(prop as string);
    }
    return this.filterableColumnsMapping[prop];
  }
}
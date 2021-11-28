import { Filter } from "./Filter";
import { PrismaTranslator } from "../../Infrastructure/Data/PrismaTranslator";

export class Criteria<T> {
  private readonly _filters: Filter<T>[] = [];
  private prisma = new PrismaTranslator();

  public add(filter: Filter<T>): void {
    this._filters.push(filter);
  }

  public translate(): any {
    
  }

  public filters(): Filter<T>[] {
    return this._filters;
  }
}

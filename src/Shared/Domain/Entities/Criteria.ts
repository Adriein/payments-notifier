import { Filter } from "./Filter";
import { PrismaTranslator } from "./PrismaTranslator";

export class Criteria {

  private prisma = new PrismaTranslator();

  constructor(private readonly _filters: Filter[]) {}

  public translate(): any {
    return this.prisma.toPrisma(this._filters);
  }

  public filters(): Filter[] {
    return this._filters;
  }
}

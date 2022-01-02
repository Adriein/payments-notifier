import { Criteria } from "../../Domain/Entities/Criteria";
import { JSObject, Model } from "../../Domain/types";
import { Filter } from "../../Domain/Entities/Filter";
import { PrismaPagination } from "../types";

export class PrismaQueryBuilder<F, M extends JSObject> {
  constructor(private readonly criteria: Criteria<F>, private readonly model: Model) {}

  public build<R>(): R {
    const filters = this.criteria.filters();
    let prismaWhereInput: JSObject = {};

    for (const filter of filters) {
      const dbField = this.model[filter.field()].field;

      if (this.isJoin(dbField)) {
        prismaWhereInput = { ...prismaWhereInput, ...this.join(dbField, filter) }
        continue;
      }
      const dbOperation = filter.operation();

      prismaWhereInput[dbField] = { [dbOperation]: filter.value() }
    }

    return prismaWhereInput as unknown as R;
  }

  public pagination(): PrismaPagination | undefined {
    if (this.criteria.page() && this.criteria.quantity()) {
      return {
        take: this.criteria.quantity()!,
        skip: (this.criteria.page()! - 1) * this.criteria.quantity()!
      }
    }

    return undefined;
  }

  private isJoin(dbField: string): boolean {
    return dbField.includes('.');
  }

  private join(dbField: string, filter: Filter<F>) {
    const [ table, field ] = dbField.split('.');

    return {
      [table]: {
        [field]: {
          [filter.operation()]: filter.value()
        }
      }
    }
  }
}
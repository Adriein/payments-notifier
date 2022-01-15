import { Criteria } from "../../Domain/Entities/Criteria";
import { JSObject, ModelSchema } from "../../Domain/types";
import { Filter } from "../../Domain/Entities/Filter";
import { PrismaPagination } from "../types";
import { MysqlMapper } from "./MysqlMapper";
import { JoinTypeMissingError } from "./JoinTypeMissingError";

export class PrismaQueryBuilder<F, M extends MysqlMapper> {
  private prismaWhereInput: JSObject = {};

  constructor(private readonly criteria: Criteria<F>, private readonly model: MysqlMapper) {}

  public build<R>(): R {
    const filters = this.criteria.filters();
    for (const filter of filters) {
      const schema = this.model.get(filter.column());

      this.buildPrismaWhereInput(schema, filter);
    }

    return this.prismaWhereInput as unknown as R;
  }

  public pagination(): PrismaPagination | {} {
    if (this.criteria.page() && this.criteria.quantity()) {
      return {
        take: this.criteria.quantity()!,
        skip: (this.criteria.page()! - 1) * this.criteria.quantity()!
      }
    }

    return {};
  }

  private buildPrismaWhereInput(schema: ModelSchema, filter: Filter<F>): void {
    if (this.isJoin(schema.field)) {
      this.prismaWhereInput = { ...this.prismaWhereInput, ...this.joinTable(schema, filter) };
      return;
    }
    const dbOperation = filter.operation();

    this.prismaWhereInput = { ...this.prismaWhereInput, [schema.field]: { [dbOperation]: filter.value() } };
  }

  private isJoin(column: string): boolean {
    return column.includes('.');
  }

  private joinTable(schema: ModelSchema, filter: Filter<F>) {
    const [ table, field ] = schema.field.split('.');

    if (!schema.hasOwnProperty('joinType')) {
      throw new JoinTypeMissingError();
    }

    return {
      [table]: {
        ...(schema.joinType === 'array' ? {
          some: {
            [field]: {
              [filter.operation()]: filter.value()
            }
          }
        } : {
          [field]: {
            [filter.operation()]: filter.value()
          }
        })
      }
    }
  }
}
import { Filter } from "./Filter";
import { OPERATORS } from "../../../Domain/constants";

export class PrismaTranslator {
  public toPrisma(filters: Filter[]): any {
    return filters.reduce((acc: any, curr: Filter) => {
      return { ...acc, ...this.assertFilter(curr) };
    }, {});
  }

  private assertFilter(filter: Filter): any {
    const nested = filter.field().split('.');

    if (filter.operation() === OPERATORS.equal) {
      if (nested.length > 1) {
        return {
          [nested[0]]: {
            every: {
              [nested[1]]: filter.value()
            }
          }
        }
      }

      return {
        [filter.field()]: filter.value()
      }
    }

    if (filter.operation() === OPERATORS.like) {
      return {
        [filter.field()]: {
          contains: filter.value()
        }
      }
    }

  }
}
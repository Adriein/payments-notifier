import { FilterProps } from "../Action/Filter/FilterProps";
import { isEqual } from "lodash";

export class FilterService<T extends FilterProps> {
  constructor(private readonly filters: T[]) {}

  public exists(filterToFind: T): boolean {
    const repeated = this.filters.find(({ field }: FilterProps) => field === filterToFind.field);

    return !!repeated;
  }

  public isValueDiff(filter: T): boolean {
    const repeated = this.filters.find(({ field }: FilterProps) => field === filter.field);
    return !isEqual(filter, repeated);
  }

  public remove(filterToRemove: T): T[] {
    return this.filters.filter((filter: FilterProps) => filter.field !== filterToRemove.field);
  }
}
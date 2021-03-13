import { OPERATORS } from '../constants';
import { Criteria } from '../Entities/Criteria.entity';
import { Filter } from '../Entities/Filter.entity';
import { CriteriaObject } from '../types';

export class CriteriaBuilder {
  constructor() {}

  public build(criteria: CriteriaObject): Criteria {
    const filters = Object.keys(criteria).reduce((prevFilter, key) => {
      return [
        ...prevFilter,
        new Filter(
          key,
          criteria[key].value,
          OPERATORS[criteria[key].operation as keyof typeof OPERATORS]
        ),
      ];
    }, Array<Filter>());

    return new Criteria(filters);
  }
}

import { IQuery } from '../../../../Shared/Domain/Interfaces/IQuery';

export class SearchFoodQuery implements IQuery {
  constructor(public readonly searchTerm: string, public readonly adminId: string) {}
}

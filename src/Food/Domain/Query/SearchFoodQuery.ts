export class SearchFoodQuery {
  constructor(public readonly searchTerm: string, public readonly userId: string) {}
}

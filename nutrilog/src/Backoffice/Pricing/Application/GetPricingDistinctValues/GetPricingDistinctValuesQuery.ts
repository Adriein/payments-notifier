export class GetPricingDistinctValuesQuery {
  constructor(public readonly tenantId: string, public readonly values: string[]) {}
}
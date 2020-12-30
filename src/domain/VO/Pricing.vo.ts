import { PricingType } from '../constants';
import { PricingError } from '../errors';

export class Pricing {
  constructor(public pricingType: string) {
    if (
      typeof pricingType !== 'string' ||
      (pricingType !== PricingType.monthly &&
        pricingType !== PricingType.quarterly)
    ) {    
      throw new PricingError();
    }
  }
}

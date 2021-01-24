import { PricingType } from '../constants';
import { PricingError } from '../Errors';

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

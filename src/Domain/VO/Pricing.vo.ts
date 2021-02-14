import { PricingType } from '../constants';
import { PricingError } from '../Errors';
import { PricingObject } from '../types';

export class Pricing {
  constructor(public pricingType: PricingObject) {
    if (typeof pricingType !== 'object' || !this.evaluateKeys(pricingType)) {
      throw new PricingError();
    }
  }

  private evaluateKeys(object: Object): boolean {
    if (PricingType.DURATION in object) {
      return true;
    }

    if (PricingType.PRICE in object) {
      return true;
    }

    return false;
  }
}

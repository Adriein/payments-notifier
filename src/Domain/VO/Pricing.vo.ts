import { PricingType } from '../constants';
import { PricingError } from '../Errors';
import { PricingObject } from '../types';

export class Pricing {
  private pricing: PricingObject;
  constructor(pricing: PricingObject) {
    if (typeof pricing !== 'object' || !this.evaluateKeys(pricing)) {
      throw new PricingError();
    }
    this.pricing = pricing;
  }

  private evaluateKeys(object: Object): boolean {
    Object.keys(object).map((key) => {
      if (!(PricingType.DURATION in object)) {
        return false;
      }

      if (!(PricingType.PRICE in object)) {
        return false;
      }
    });
    return true;
  }

  public get value(): PricingObject {
    return this.pricing;
  }
}

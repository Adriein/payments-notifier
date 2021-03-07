import { PricingType } from '../constants';
import { PricingError } from '../Errors';
import { PricingObject } from '../types';

export class Pricing {
  private pricing: PricingObject;
  constructor(pricing: PricingObject) {
    if (
      typeof pricing !== 'object' ||
      !this.evaluateKeys(pricing[Object.keys(pricing)[0]])
    ) {
      throw new PricingError();
    }
    this.pricing = pricing;
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

  public get value(): PricingObject {
    return this.pricing;
  }
}

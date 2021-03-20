import { Subscription } from '../../../Domain/Entities/Subscription.entity';
import { IMapper } from '../../../Domain/Interfaces/IMapper';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { Pricing } from '../../../Domain/VO/Pricing.vo';

type SubscriptionTable = {
  id: string;
  pricing: string;
  payment_date: string;
  warned: boolean;
  notified: boolean;
  active: boolean;
  user_id: string;
};

export class SubscriptionMapper implements IMapper<Subscription> {
  public domain(subscriptionDatamodel: SubscriptionTable): Subscription {
    return new Subscription(
      subscriptionDatamodel.id,
      new Pricing(JSON.parse(subscriptionDatamodel.pricing)),
      new LastPaymentDate(subscriptionDatamodel.payment_date),
      subscriptionDatamodel.warned,
      subscriptionDatamodel.notified,
      subscriptionDatamodel.active
    );
  }
  public datamodel(domain: Subscription): SubscriptionTable {
    throw new Error('not implemented');
  }
}

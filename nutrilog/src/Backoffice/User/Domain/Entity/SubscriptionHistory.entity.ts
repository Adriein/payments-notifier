import { BaseEntity } from "../../../../Shared/Domain/Entities/BaseEntity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { SUBSCRIPTION_STATUS } from "../constants";

export class SubscriptionHistory extends BaseEntity {
  public static build(event: SUBSCRIPTION_STATUS): SubscriptionHistory {
    return new SubscriptionHistory(ID.generate(), event);
  }

  constructor(_id: ID, private _event: SUBSCRIPTION_STATUS, _createdAt?: Date, _updatedAt?: Date) {
    super(_id, _createdAt, _updatedAt);
  }

  public event(): SUBSCRIPTION_STATUS {
    return this._event;
  }
  
}
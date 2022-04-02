import { Collection } from "../../../../Shared/Domain/Entities/Collection";
import { SubscriptionHistory } from "./SubscriptionHistory.entity";
import { SUBSCRIPTION_STATUS } from "../constants";


export class SubscriptionHistoryCollection extends Collection<SubscriptionHistory> {
  public static build(historyList: SubscriptionHistory[]): SubscriptionHistoryCollection {
    return new SubscriptionHistoryCollection(historyList);
  }

  constructor(data: SubscriptionHistory[]) {
    super(data);
  }
  
  public containsEvent(event: SUBSCRIPTION_STATUS): boolean {
    return !!this.data()
      .find((history: SubscriptionHistory) => history.event() === event);
  }
}
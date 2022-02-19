import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";

export class FindSubscriptionNotificationQuery implements IQuery {
  constructor(public readonly criteria: { userId?: string | string [], subscription }) {}
}
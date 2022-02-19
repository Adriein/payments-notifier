export class FindSubscriptionNotificationResponse {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly subscriptionId: string,
    public readonly userId: string
  ) {}
}
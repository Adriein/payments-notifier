export interface IEmailNotificationRepository<T> {
  send(email: T): Promise<void>;
}

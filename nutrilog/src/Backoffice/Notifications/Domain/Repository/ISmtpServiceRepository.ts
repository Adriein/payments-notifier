export interface ISmtpServiceRepository<T> {
  send(email: T): Promise<void>;
}

import { v4 as uuidv4 } from 'uuid';
import { Email } from '../VO/Email.vo';
import { Subscription } from './Subscription.entity';

export class User {
  public static build(
    name: string,
    email: Email,
    subscription: Subscription
  ): User {
    return new User(uuidv4(), name, email.email, subscription);
  }
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private subscription?: Subscription
  ) {}

  get isDefaulter(): () =>  boolean {
    if(this.subscription) {
      return this.subscription.isDefaulter;
    }
    throw new Error();
  }

  get isTwoDaysBeforeExpiration(): (() => boolean) | undefined {
    return this.subscription?.isTwoDaysBeforeExpiration;
  }

  get resetNotificationState(): (() => void) | undefined {
    return this.subscription?.resetNotificationState;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPricing(): (() => string) | undefined {
    return this.subscription?.getPricing;
  }

  public getPaymentDate(): (() => Date) | undefined {
    return this.subscription?.getPaymentDate;
  }

  public getIsNotified(): (() => boolean) | undefined {
    return this.subscription?.getIsNotified;
  }

  public getIsWarned(): (() => boolean) | undefined {
    return this.subscription?.getIsWarned;
  }

  public setIsNotified(): (() => void) | undefined {
    return this.subscription?.setIsNotified;
  }

  public setIsWarned(): (() => void) | undefined {
    return this.subscription?.setIsWarned;
  }
}

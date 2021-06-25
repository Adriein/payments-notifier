import { v4 as uuidv4 } from 'uuid';
import { SubscriptionError } from '../Errors/Users/SubscriptionError';
import { ISerializable } from '../Interfaces/ISerializable';
import { Activity } from '../VO/Activity.vo';
import { Age } from '../VO/Age.vo';
import { Email } from '../VO/Email.vo';
import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Password } from '../VO/Password.vo';
import { Pricing } from '../VO/Pricing.vo';
import { Nutrition } from './Nutrition.entity';
import { Subscription } from './Subscription.entity';
import { UserConfig } from './UserConfig.entity';

export class User implements ISerializable {
  public static build(
    name: string,
    email: Email,
    config: UserConfig,
    ownerId?: string
  ): User {
    return new User(uuidv4(), name, email, config, ownerId);
  }
  constructor(
    private id: string,
    private name: string,
    private email: Email,
    private config: UserConfig,
    private _ownerId?: string
  ) {}

  private subscription?: Subscription;
  private password?: string;
  private _createdAt?: Date;
  private nutrition?: Nutrition;

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email.value;
  }

  public get ownerId(): string | undefined {
    return this._ownerId;
  }

  public get createdAt(): Date {
    return this._createdAt!;
  }

  public setCreatedAt(date: Date) {
    this._createdAt = date;
  }

  public async createPassword(password: Password): Promise<void> {
    this.password = await password.getHashedPassword();
  }

  public getPassword(): string | undefined {
    return this.password;
  }

  public setPassword(password: Password): void {
    this.password = password.value;
  }

  public createSubscription(
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    isWarned: boolean = false,
    isNotified: boolean = false
  ): void {
    this.subscription = Subscription.build(
      pricing,
      lastPayment,
      isWarned,
      isNotified
    );
  }

  public setSubscription(
    id: string,
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    isWarned: boolean,
    isNotified: boolean,
    isActive: boolean
  ): void {
    this.subscription = new Subscription(
      id,
      pricing,
      lastPayment,
      isWarned,
      isNotified,
      isActive
    );
  }

  public createNutrition(
    weight: number,
    height: number,
    kcal: number,
    allergies: string[],
    favourites: string[],
    hated: string[],
    age: Age,
    activity: Activity
  ) {
    this.nutrition = Nutrition.build(
      weight,
      height,
      kcal,
      allergies,
      favourites,
      hated,
      age,
      activity
    );
  }

  public setNutrition(
    id: string,
    weight: number,
    height: number,
    kcal: number,
    allergies: string[],
    favourites: string[],
    hated: string[],
    age: Age,
    activity: Activity
  ) {
    this.nutrition = new Nutrition(
      id,
      weight,
      height,
      kcal,
      allergies,
      favourites,
      hated,
      age,
      activity
    );
  }

  public hasNutrition = (): boolean => {
    if (this.nutrition) {
      return true;
    }

    return false;
  };

  public hasSubscription = (): boolean => {
    if (this.subscription) {
      return true;
    }

    return false;
  };

  public get isSubscriptionActive(): () => boolean {
    if (this.subscription) {
      return this.subscription.isActive;
    }
    throw new SubscriptionError();
  }

  public get isDefaulter(): () => boolean {
    if (this.subscription) {
      return this.subscription.isDefaulter;
    }
    throw new SubscriptionError();
  }

  public get isOneDayOldDefaulter(): () => boolean {
    if (this.subscription) {
      return this.subscription.isOneDayOldDefaulter;
    }
    throw new SubscriptionError();
  }

  public get isAboutToExpire(): (
    daysBeforeExpiration: number | undefined
  ) => boolean {
    if (this.subscription) {
      return this.subscription.isAboutToExpire;
    }
    throw new SubscriptionError();
  }

  public get resetNotificationState(): () => void {
    if (this.subscription) {
      return this.subscription.resetNotificationState;
    }

    throw new SubscriptionError();
  }

  public get pricing(): () => Pricing {
    if (this.subscription) {
      return this.subscription.pricing;
    }

    throw new SubscriptionError();
  }

  public get paymentDate(): () => Date {
    if (this.subscription) {
      return this.subscription.paymentDate;
    }
    throw new SubscriptionError();
  }

  public get isNotified(): () => boolean {
    if (this.subscription) {
      return this.subscription.isNotified;
    }
    throw new SubscriptionError();
  }

  public get isWarned(): () => boolean {
    if (this.subscription) {
      return this.subscription.isWarned;
    }

    throw new SubscriptionError();
  }

  public get setIsNotified(): () => void {
    if (this.subscription) {
      return this.subscription.setIsNotified;
    }

    throw new SubscriptionError();
  }

  public get setIsWarned(): () => void {
    if (this.subscription) {
      return this.subscription.setIsWarned;
    }

    throw new SubscriptionError();
  }

  public get desactivateExpiredSubscription(): () => void {
    if (this.subscription) {
      return this.subscription.desactivateExpiredSubscription;
    }

    throw new SubscriptionError();
  }

  public get subscriptionId(): () => string | null {
    if (!this.subscription) {
      return () => null;
    }
    return this.subscription!.id;
  }

  public get sendNotifications(): () => boolean {
    return this.config.getSendNotifications;
  }

  public get sendWarnings(): () => boolean {
    return this.config.getSendWarnings;
  }

  public get lang(): () => string {
    return this.config.getLang;
  }

  public get role(): () => string {
    return this.config.getRole;
  }

  public get configId(): () => string | undefined {
    return this.config.getId;
  }

  public get nutritionId(): () => string {
    if (this.nutrition) {
      return this.nutrition.getId;
    }

    throw new Error();
  }

  public get weight(): () => number {
    if (this.nutrition) {
      return this.nutrition.getWeight;
    }

    throw new Error();
  }

  public get height(): () => number {
    if (this.nutrition) {
      return this.nutrition.getHeight;
    }

    throw new Error();
  }

  public get kcal(): () => number {
    if (this.nutrition) {
      return this.nutrition.getKcal;
    }

    throw new Error();
  }

  public get allergies(): () => string[] {
    if (this.nutrition) {
      return this.nutrition.getAllergies;
    }

    throw new Error();
  }

  public get favourites(): () => string[] {
    if (this.nutrition) {
      return this.nutrition.getFavourites;
    }

    throw new Error();
  }

  public get hated(): () => string[] {
    if (this.nutrition) {
      return this.nutrition.getHated;
    }

    throw new Error();
  }

  public get age(): () => number {
    if (this.nutrition) {
      return this.nutrition.getAge;
    }

    throw new Error();
  }

  public get activity(): () => string {
    if (this.nutrition) {
      return this.nutrition.getActivity;
    }

    throw new Error();
  }

  public serialize(): Object {
    return {
      id: this.id,
      username: this.name,
      email: this.email.value,
      defaulter: this.subscription ? (this.isDefaulter() ? 'Si' : 'No') : null,
      subscription: this.subscription ? this.subscription.serialize() : null,
      config: this.config.serialize(),
      nutrition: this.nutrition ? this.nutrition.serialize() : null,
    };
  }
}

import { ISerializable } from '../Interfaces/ISerializable';
import { v4 as uuidv4 } from 'uuid';
import { Pricing } from '../VO/Pricing.vo';
import { PricingObject } from '../../Shared/Domain/types';

export class AppConfig implements ISerializable {
  public static build(
    pricing: any,
    warningDelay: number,
    defaulterDelay: number,
    emailContent: string,
    adminId: string,
    lastSentReport?: Date
  ) {
    return new AppConfig(
      uuidv4(),
      warningDelay,
      defaulterDelay,
      emailContent,
      adminId,
      new Pricing(pricing),
      lastSentReport
    );
  }
  constructor(
    private _id: string,
    private _warningDelay: number,
    private _defaulterDelay: number,
    private _emailContent: string,
    private _adminId?: string,
    private _pricing?: Pricing,
    private _last_sent_report?: Date
  ) {}

  public createPricing(pricing: PricingObject) {
    this._pricing = new Pricing(pricing);
  }

  public get id(): string {
    return this._id;
  }

  public get pricing(): Pricing | undefined {
    return this._pricing;
  }

  public get warningDelay(): number {
    return this._warningDelay;
  }

  public get defaulterDelay(): number {
    return this._defaulterDelay;
  }

  public get emailContent(): string {
    return this._emailContent;
  }

  public get adminId(): string | undefined {
    return this._adminId;
  }

  public get lastSentReport(): Date | undefined {
    return this._last_sent_report;
  }

  public serialize(): Object {
    return {
      id: this._id,
      pricing: this._pricing?.value ?? '',
      warningDelay: this._warningDelay,
      defaulterDelay: this._defaulterDelay,
      emailContent: this._emailContent,
      lastSentReport: this._last_sent_report
    };
  }
}

import { ISerializable } from '../Interfaces/ISerializable';
import { v4 as uuidv4 } from 'uuid';
import { Pricing } from '../VO/Pricing.vo';

export class AppConfig implements ISerializable {
  public static build(
    pricing: Pricing,
    warningDelay: number,
    defaulterDelay: number,
    emailContent: string,
    adminId: string
  ) {
    return new AppConfig(
      uuidv4(),
      pricing,
      warningDelay,
      defaulterDelay,
      emailContent,
      adminId
    );
  }
  constructor(
    private _id: string,
    private _pricing: Pricing,
    private _warningDelay: number,
    private _defaulterDelay: number,
    private _emailContent: string,
    private _adminId?: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get pricing(): Pricing {
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

  public serialize(): Object {
    return {
      id: this._id,
      pricing: this._pricing.pricingType,
      warningDelay: this._warningDelay,
      defaulterDelay: this._defaulterDelay,
      emailContent: this._emailContent,
    };
  }
}

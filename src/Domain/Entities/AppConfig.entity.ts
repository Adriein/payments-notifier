import { ISerializable } from '../Interfaces/ISerializable';

export class AppConfig implements ISerializable {
  constructor(
    private _id: string,
    private _pricing: any,
    private _warningDelay: number,
    private _defaulterDelay: number,
    private _emailContent: string,
    private _adminId?: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get pricing(): any {
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
      pricing: this._pricing,
      warningDelay: this._warningDelay,
      defaulterDelay: this._defaulterDelay,
      emailContent: this._emailContent,
    };
  }
}

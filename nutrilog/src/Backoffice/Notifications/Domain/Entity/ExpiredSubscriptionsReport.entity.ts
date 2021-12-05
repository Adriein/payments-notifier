import { Defaulter } from "../VO/Defaulter.vo";
import { Summary } from "../VO/Summary.vo";

export class ExpiredSubscriptionsReport {
  constructor(private _defaulterList: Defaulter[], private _oldDefaulterList: Defaulter[], private _summary: Summary) {}


  public defaulterList(): Defaulter[] {
    return this._defaulterList;
  }

  public oldDefaulterList(): Defaulter[] {
    return this._oldDefaulterList;
  }

  public summary(): Summary {
    return this._summary;
  }
}
export class Summary {
  constructor(
    private _totalDefaulter: number,
    private _lastReportDate: Date,
    private _reportDate: Date,
    private _totalAboutToExpireEmailSent: number,
    private _totalAboutToExpireEmailRead: number
  ) {}


  public totalDefaulter(): number {
    return this._totalDefaulter;
  }

  public lastReportDate(): Date {
    return this._lastReportDate;
  }

  public reportDate(): Date {
    return this._reportDate;
  }

  public totalAboutToExpireEmailSent(): number {
    return this._totalAboutToExpireEmailSent;
  }

  public totalAboutToExpireEmailRead(): number {
    return this._totalAboutToExpireEmailRead;
  }
}
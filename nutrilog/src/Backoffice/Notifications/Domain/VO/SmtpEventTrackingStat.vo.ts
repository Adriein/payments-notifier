export class SmtpEventTrackingStat {
  constructor(private _date: Date, private _totalEmailSent: number, private _totalEmailRead: number) {}


  public date(): Date {
    return this._date;
  }

  public totalEmailSent(): number {
    return this._totalEmailSent;
  }

  public totalEmailRead(): number {
    return this._totalEmailRead;
  }
}
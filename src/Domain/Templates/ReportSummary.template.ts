import { Time } from "../../Infraestructure/Helpers/Time.utils";

export class ReportSummary {
  private _totalDefaulters: number = 0;
  private _totalNewDefaulters: number = 0;
  private _totalEmailsSent: number = 0;
  private _totalEmailsOpened: number = 0;
  private _reportDate: string = Time.format(new Date(), Time.EUROPEAN_DATE_FORMAT);

  constructor(private _lastReportDate: string) {}

  public totalDefaulters = (): number => {
    return this._totalDefaulters;
  }

  public incrementTotalDefaulters = (): void => {
    this._totalDefaulters = this._totalDefaulters + 1;
  }

  public totalNewDefaulters = (): number => {
    return this._totalNewDefaulters;
  }

  public incrementTotalNewDefaulters = (): void => {
    this._totalNewDefaulters = this._totalNewDefaulters + 1;
  }

  public totalEmailsSent = (): number => {
    return this._totalEmailsSent;
  }

  public incrementTotalEmailsSent = (sent: number): void => {
    this._totalEmailsSent = this._totalEmailsSent + sent;
  }

  public totalEmailsOpened = (): number => {
    return this._totalEmailsOpened;
  }

  public incrementTotalEmailsOpened = (open: number): void => {
    this._totalEmailsOpened = this._totalEmailsOpened + open;
  }

  public lastReportDate = (): string => {
    return this._lastReportDate;
  }

  public reportDate = (): string => {
    return this._reportDate;
  }
}

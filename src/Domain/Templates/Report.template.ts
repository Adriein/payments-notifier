import { ReportSummary } from './ReportSummary.template';

export class Report {
  private _defaulters: string[] = [];
  private _oldDefaulters: string[] = [];

  private _summary: ReportSummary;

  constructor(lastReportDate: string) {
    this._summary = new ReportSummary(lastReportDate);
  }

  public addDefaulter = (defaulter: string): void => {
    this._defaulters.push(defaulter);
  };

  public addOldDefaulter = (oldDefaulter: string): void => {
    this._oldDefaulters.push(oldDefaulter);
  };

  public defaulters = (): string[] => {
    return this._defaulters;
  };

  public oldDefaulters = (): string[] => {
    return this._oldDefaulters;
  };

  public totalDefaulters = (): (() => number) => {
    return this._summary.totalDefaulters;
  };

  public totalNewDefaulters = (): (() => number) => {
    return this._summary.totalNewDefaulters;
  };

  public totalEmailsSent = (): (() => number) => {
    return this._summary.totalEmailsSent;
  };

  public totalEmailsOpened = (): (() => number) => {
    return this._summary.totalEmailsOpened;
  };

  public lastReportDate = (): (() => string) => {
    return this._summary.lastReportDate;
  };

  public reportDate = (): (() => string) => {
    return this._summary.reportDate;
  };

  public incrementTotalDefaulters = (): (() => void) => {
    return this._summary.incrementTotalDefaulters;
  };

  public incrementTotalNewDefaulters = (): (() => void) => {
    return this._summary.incrementTotalNewDefaulters;
  };

  public incrementTotalEmailsSent = (sent: number): void => {
    return this._summary.incrementTotalEmailsSent.call(this, sent);
  }

  public incrementTotalEmailsOpened = (sent: number): void => {
    return this._summary.incrementTotalEmailsOpened.call(this, sent);
  }
}

import { ReportSummary } from './ReportSummary.template';

export class Report {
  private _defaulters: { name: string; email: string }[] = [] as any;
  private _oldDefaulters: { name: string; email: string }[] = [] as any;

  private _summary: ReportSummary;

  constructor(lastReportDate: string) {
    this._summary = new ReportSummary(lastReportDate);
  }

  public addDefaulter = (defaulter: { name: string; email: string }): void => {
    this._defaulters.push(defaulter);
  };

  public addOldDefaulter = (oldDefaulter: {
    name: string;
    email: string;
  }): void => {
    this._oldDefaulters.push(oldDefaulter);
  };

  public defaulters = (): { name: string; email: string }[] => {
    return this._defaulters;
  };

  public oldDefaulters = (): { name: string; email: string }[] => {
    return this._oldDefaulters;
  };

  public totalDefaulters = (): number => {
    return this._summary.totalDefaulters;
  };

  public totalNewDefaulters = (): number => {
    return this._summary.totalNewDefaulters;
  };

  public totalEmailsSent = (): number => {
    return this._summary.totalEmailsSent;
  };

  public totalEmailsOpened = (): number => {
    return this._summary.totalEmailsOpened;
  };

  public lastReportDate = (): string => {
    return this._summary.lastReportDate;
  };

  public reportDate = (): string => {
    return this._summary.reportDate;
  };

  public incrementTotalDefaulters = (): void => {
    return this._summary.incrementTotalDefaulters();
  };

  public incrementTotalNewDefaulters = (): void => {
    return this._summary.incrementTotalNewDefaulters();
  };

  public incrementTotalEmailsSent = (sent: number): void => {
    return this._summary.incrementTotalEmailsSent(sent);
  };

  public incrementTotalEmailsOpened = (sent: number): void => {
    return this._summary.incrementTotalEmailsOpened(sent);
  };
}

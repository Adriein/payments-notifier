type Summary = {
  totalDefaulters: number;
  newDefaulters: number;
  lastReportDate: string;
  reportDate: string;
  totalWarningEmailsSent: number;
  totalEmailsRead: number;
};

export class NewReport {
  constructor(private _users: string[], private _summary: Summary) {}

  public users(): string[] {
    return this._users;
  }

  public summary(): Summary {
    return this._summary;
  }
}

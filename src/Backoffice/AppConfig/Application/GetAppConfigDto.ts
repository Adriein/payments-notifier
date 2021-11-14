export class GetAppConfigDto {
  constructor(
    public id: string,
    public warningDelay: number,
    public notificationDelay: number,
    public emailContent: string,
    public lastSentReport: Date,
  ) {}
}
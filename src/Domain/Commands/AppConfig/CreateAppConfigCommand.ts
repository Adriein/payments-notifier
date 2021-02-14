export class CreateAppConfigCommand {
  constructor(
    public pricing: any,
    public warningDelay: number,
    public defaulterDelay: number,
    public emailContent: string,
    public adminId: string
  ) {}
}

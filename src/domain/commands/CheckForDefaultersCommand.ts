export class CheckForDefaultersCommand {
  constructor(
    public name: string,
    public email: string,
    public pricing: string,
    public lastPayment: string
  ) {}
}

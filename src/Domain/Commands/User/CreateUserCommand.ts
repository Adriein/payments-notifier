export class CreateUserCommand {
  constructor(
    public username: string,
    public email: string,
    public pricing: string,
    public lastPaymentDate: string,
    public adminId: string,
  ) {}
}

export class UpdateUserCommand {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public pricing: string
  ) {}
}

export class CreateUserCommand {
  constructor(
    public username: string,
    public email: string,
    public weight: number,
    public height: number,
    public age: number,
    public activity: string
  ) {}
}

export class CreateUserCommand {
  constructor(
    public username: string,
    public email: string,
    public pricing: string,
    public lastPaymentDate: string,
    public adminId: string,
    public weight?: number,
    public height?: number,
    public kcal?: number,
    public allergies?: string[],
    public favourites?: string[],
    public hated?: string[],
    public age?: number,
    public activity?: string
  ) {}
}

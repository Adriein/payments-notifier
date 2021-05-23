export class CreateDietCommand {
  constructor(
    public userId: string,
    public name: string,
    public kcal: string
  ) {}
}

export class CreateNutritionCommand {
  constructor(
    public userId: string,
    public weight: number,
    public height: number,
    public age: number,
    public gender: string
  ) {}
}

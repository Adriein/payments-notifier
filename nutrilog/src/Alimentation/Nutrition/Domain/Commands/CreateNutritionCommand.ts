export class CreateNutritionCommand {
  constructor(
    public userId: string,
    public adminId: string,
    public weight: number,
    public height: number,
    public age: number,
    public gender: string
  ) {}
}

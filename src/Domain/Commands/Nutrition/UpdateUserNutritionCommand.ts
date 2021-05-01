export class UpdateUserNutritionCommand {
  constructor(
    public weight: number,
    public height: number,
    public objective: string,
    public age: number,
    public activity: string,
    public gender: string,
    public userId: string
  ) {}
}

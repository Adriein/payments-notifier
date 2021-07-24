export class CreateDietCommand {
  constructor(
    public name: string,
    public nutritionId: string,
    public objective: string,
    public kcalChange?: number
  ) {}
}

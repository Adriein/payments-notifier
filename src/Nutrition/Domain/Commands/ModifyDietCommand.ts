export class ModifyDietCommand {
  constructor(
    public nutritionId: string,
    public dietId: string,
    public meals: any[]
  ) {}
}

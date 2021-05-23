export class UpdateDietCommand {
  constructor(
    public dietId: string,
    public userId: string,
    public name: string,
    public kcal: string,
    public meals: []
  ) {}
}

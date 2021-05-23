export class DietCustomitzation {
  constructor(
    private _id: string,
    private _dietId: string,
    private _weeklyOrganized: boolean = false,
    private _mealOrganized: boolean = true
  ) {}

  public makeWeeklyOrganized(): void {
    this._weeklyOrganized = true;
    this._mealOrganized = false;
  }

  public makeMealOrganized(): void {
    this._weeklyOrganized = false;
    this._mealOrganized = true;
  }

  public get isWeeklyOrganized(): boolean {
    return this._weeklyOrganized;
  }

  public get isMealOrganized(): boolean {
    return this._mealOrganized;
  }

  public get id(): string {
    return this._id;
  }

  public get dietId(): string {
    return this.dietId;
  }
}

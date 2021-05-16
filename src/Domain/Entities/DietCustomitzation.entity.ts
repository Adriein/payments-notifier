export class DietCustomitzation {
  constructor(
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
}

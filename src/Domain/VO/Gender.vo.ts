import { GenderType } from '../constants';

export class Gender {
  private gender: string;
  constructor(gender: string) {
    if (
      typeof gender !== 'string' ||
      (gender !== GenderType.male && gender !== GenderType.female)
    ) {
      throw new NutritionObjectiveError();
    }

    this.gender = gender;
  }

  public get value(): string {
    return this.gender;
  }
}

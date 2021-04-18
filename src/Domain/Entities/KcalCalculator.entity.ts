import { NotGenderError } from '../Errors/Nutrition/NotGenderError';
import { Age } from '../VO/Age.vo';

export class KcalCalculator {
  private _gender?: string;
  public calculate(weight: number, height: number, age: Age): number {
    if (!this._gender) {
      throw new NotGenderError();
    }

    return 
  }

  private maleFormula(): string {
    return '13.397*(W) + 4.799*(H) - 5.677*(A) + 88.362';
  }
  private femaleFormula(): string {
    return '13.397*(W) + 4.799*(H) - 5.677*(A) + 88.362';
  }

  public gender(gender: string) {
    this._gender = gender;
    return this;
  }
}

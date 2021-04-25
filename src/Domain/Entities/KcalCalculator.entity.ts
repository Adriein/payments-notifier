import { GenderType } from '../constants';
import { NotGenderError } from '../Errors/Nutrition/NotGenderError';

export class KcalCalculator {
  private _gender?: string;
  private _formula?: string;

  public calculate(weight: number, height: number, age: number): number {
    if (!this._gender) {
      throw new NotGenderError();
    }

    if (this._gender === GenderType.female) {
      this._formula = this.femaleFormula();
    }

    if (this._gender === GenderType.male) {
      this._formula = this.maleFormula();
    }

    return eval(this.parseFormula(this._formula!, { weight, height, age }));
  }

  private maleFormula(): string {
    return '13.397*(P) + 4.799*(A) - 5.677*(E) + 88.362';
  }
  private femaleFormula(): string {
    return '13.397*(P) + 4.799*(A) - 5.677*(E) + 88.362';
  }

  private parseFormula(
    formula: string,
    values: { weight: number; height: number; age: number }
  ) {
    return formula
      .replace('P', values.weight.toString())
      .replace('A', values.height.toString())
      .replace('E', values.age.toString());
  }

  public gender(gender: string) {
    this._gender = gender;
    return this;
  }
}

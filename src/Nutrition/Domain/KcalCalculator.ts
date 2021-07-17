import { GenderType, KcalFormula } from '../../Shared/Domain/types';

export class KcalCalculator {
  private MALE = 'male';
  private FEMALE = 'female';
  private _gender?: string;
  private _formula!: string;

  public calculate(weight: number, height: number, age: number): number {
    if (!this._gender) {
      throw new Error();
    }

    if (this._gender === this.FEMALE) {
      this._formula = this.femaleFormula();
    }

    if (this._gender === this.MALE) {
      this._formula = this.maleFormula();
    }

    return eval(this.parseFormula(this._formula, { weight, height, age }));
  }

  private maleFormula(): string {
    return '13.397*(P) + 4.799*(A) - 5.677*(E) + 88.362';
  }
  private femaleFormula(): string {
    return '13.397*(P) + 4.799*(A) - 5.677*(E) + 88.362';
  }

  private parseFormula(formula: string, { weight, height, age }: KcalFormula) {
    return formula
      .replace('P', weight.toString())
      .replace('A', height.toString())
      .replace('E', age.toString());
  }

  public gender(gender: string) {
    this._gender = gender;
    return this;
  }
}

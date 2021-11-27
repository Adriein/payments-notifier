import { Nutrition } from './Nutrition.entity';

export class KcalCalculator {
  private FEMALE = 'female';

  public calculate(nutrition: Nutrition): number {
    if (nutrition.gender() === this.FEMALE) {
      return eval(this.parseFormula(this.femaleFormula(), nutrition));
    }

    return eval(this.parseFormula(this.maleFormula(), nutrition));
  }

  private maleFormula(): string {
    return '13.397*(P) + 4.799*(A) - 5.677*(E) + 88.362';
  }
  private femaleFormula(): string {
    return '13.397*(P) + 4.799*(A) - 5.677*(E) + 88.362';
  }

  private parseFormula(formula: string, nutrition: Nutrition) {
    return formula
      .replace('P', nutrition.weight().toString())
      .replace('A', nutrition.height().toString())
      .replace('E', nutrition.age().toString());
  }
}

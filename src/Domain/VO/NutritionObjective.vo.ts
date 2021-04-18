import { NutritionalObjectiveType } from '../constants';
import { NutritionObjectiveError } from '../Errors/Nutrition/NutritionObjectiveError';

export class NutritionObjective {
  private objective: string;
  constructor(objective: string) {
    if (
      typeof objective !== 'string' ||
      (objective !== NutritionalObjectiveType.lose_fat &&
        objective !== NutritionalObjectiveType.maintenance &&
        objective !== NutritionalObjectiveType.muscle_gain)
    ) {
      throw new NutritionObjectiveError();
    }

    this.objective = objective;
  }

  public get value(): string {
    return this.objective;
  }
}

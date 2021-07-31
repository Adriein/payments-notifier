import { CreateMealCommand } from './CreateMealCommand';

export class ModifyDietCommand {
  constructor(
    public nutritionId: string,
    public dietId: string,
    public meals: CreateMealCommand[]
  ) {}
}

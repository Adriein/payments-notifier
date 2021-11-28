import { CreateMealCommand } from './CreateMealCommand';

export class ModifyDietCommand {
  constructor(
    public name: string,
    public nutritionId: string,
    public dietId: string,
    public meals: CreateMealCommand[]
  ) {}
}

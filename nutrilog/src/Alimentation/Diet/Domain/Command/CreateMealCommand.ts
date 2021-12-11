export class CreateMealCommand {
  constructor(public readonly name: string, public readonly kcal: number, public readonly foods: any[]) {}
}

export class CreateMealCommand {
  constructor(public readonly name: string, public readonly foods: any[]) {}
}

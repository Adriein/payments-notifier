export class SaveFoodCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly unit: string,
    public readonly qty: number,
    public readonly photo: string,
    public readonly kcal: number,
    public readonly micro: { name: string, amount: number }[],
    public readonly dateCreated: string,
    public readonly dateUpdated: string
  ) {}
}
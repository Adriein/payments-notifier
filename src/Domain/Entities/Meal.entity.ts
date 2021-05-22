import { ISerializable } from '../Interfaces/ISerializable';
import { Food } from '../VO/Food.vo';

export class Meal implements ISerializable {
  constructor(
    private _id: string,
    private _name: string,
    private _foods: Food[]
  ) {}

  public add(food: Food): void {
    this._foods.push(food);
  }

  public remove(foodToRemove: Food): void {
    this._foods = this._foods.filter((food) => food.id !== foodToRemove.id);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get foods(): Food[] {
    return this._foods;
  }

  public serialize(): Object {
    return {
      id: this.id,
      name: this.name,
      foods: this.foods,
    };
  }
}

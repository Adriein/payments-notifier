import { ISerializable } from '../Interfaces/ISerializable';
import { Food } from '../VO/Food.vo';
import { v4 as uuidv4 } from 'uuid';

export class Meal implements ISerializable {
  constructor(
    private _id: string,
    private _name: string,
    private _foods: Food[],
    private _dietId: string
  ) {}

  public static build(name: string, dietId: string, foods: Food[] = []) {
    return new Meal(uuidv4(), name, foods, dietId);
  }

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

import { ISerializable } from '../Interfaces/ISerializable';
import { Activity } from '../VO/Activity.vo';
import { Age } from '../VO/Age.vo';
import { v4 as uuidv4 } from 'uuid';
import { NutritionObjective } from '../VO/NutritionObjective.vo';

export class Nutrition implements ISerializable {
  public static build(
    weight: number,
    height: number,
    objective: NutritionObjective,
    age: Age,
    activity: Activity,
    gender: 
  ): Nutrition {
    return new Nutrition(uuidv4(), weight, height, objective, age, activity);
  }

  constructor(
    private _id: string,
    private _weight: number,
    private _height: number,
    private _objective: NutritionObjective,
    private _age: Age,
    private _activity: Activity,
  ) {
  }

  private calculateKcal(): number {
    return 2000;
  }

  public id = (): string => {
    return this._id;
  };

  public weight = (): number => {
    return this._weight;
  };

  public height = (): number => {
    return this._height;
  };

  public objective = (): string => {
    return this._objective.value;
  };

  public age = (): number => {
    return this._age.value;
  };

  public activity = (): string => {
    return this._activity.value;
  };

  public serialize(): Object {
    return {
      weight: this._weight,
      height: this._height,
      objective: this.objective(),
      age: this.age(),
      activity: this.activity(),
    };
  }
}

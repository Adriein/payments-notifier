import { ISerializable } from '../interfaces/ISerializable';
import { Activity } from '../VO/Activity.vo';
import { Age } from '../VO/Age.vo';
import { v4 as uuidv4 } from 'uuid';

export class Nutrition implements ISerializable {
  public static build(
    weight: number,
    height: number,
    age: Age,
    activity: Activity
  ): Nutrition {
    return new Nutrition(uuidv4(), weight, height, age, activity);
  }

  constructor(
    private id: string,
    private weight: number,
    private height: number,
    private age: Age,
    private activity: Activity
  ) {}

  public getId = (): string => {
    return this.id;
  };

  public getWeight = (): number => {
    return this.weight;
  };

  public getHeight = (): number => {
    return this.height;
  };

  public getAge = (): number => {
    return this.age.age;
  };

  public getActivity = (): string => {
    return this.activity.activity;
  };

  public serialize(): Object {
    return {
      weight: this.weight,
      height: this.height,
      age: this.getAge(),
      activity: this.getActivity(),
    };
  }
}

import { ISerializable } from '../Interfaces/ISerializable';
import { Activity } from '../VO/Activity.vo';
import { Age } from '../VO/Age.vo';
import { v4 as uuidv4 } from 'uuid';
import { NutritionObjective } from '../VO/NutritionObjective.vo';
import { Gender } from '../VO/Gender.vo';
import { KcalCalculator } from './KcalCalculator.entity';

export class Nutrition implements ISerializable {
  private calculator: KcalCalculator = new KcalCalculator();

  public static build(
    weight: number,
    height: number,
    objective: NutritionObjective,
    age: Age,
    activity: Activity,
    gender: Gender,
    userId: string
  ): Nutrition {
    return new Nutrition(
      uuidv4(),
      weight,
      height,
      objective,
      age,
      activity,
      gender,
      userId
    );
  }

  constructor(
    private _id: string,
    private _weight: number,
    private _height: number,
    private _objective: NutritionObjective,
    private _age: Age,
    private _activity: Activity,
    private _gender: Gender,
    private _userId: string
  ) {}

  public mantinenceKcal(): number {
    return this.calculator
      .gender(this.gender())
      .calculate(this._weight, this._height, this.age());
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

  public gender = (): string => {
    return this._gender.value;
  };

  public userId = (): string => {
    return this._userId;
  };

  public serialize(): Object {
    return {
      weight: this._weight,
      height: this._height,
      objective: this.objective(),
      age: this.age(),
      activity: this.activity(),
      gender: this.gender(),
      userId: this._userId,
    };
  }
}

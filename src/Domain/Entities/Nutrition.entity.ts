import { ISerializable } from '../Interfaces/ISerializable';
import { Activity } from '../VO/Activity.vo';
import { Age } from '../VO/Age.vo';
import { v4 as uuidv4 } from 'uuid';

export class Nutrition implements ISerializable {
  public static build(
    weight: number,
    height: number,
    kcal: number,
    allergies: string[],
    favourites: string[],
    hated: string[],
    age: Age,
    activity: Activity
  ): Nutrition {
    return new Nutrition(
      uuidv4(),
      weight,
      height,
      kcal,
      allergies,
      favourites,
      hated,
      age,
      activity
    );
  }

  constructor(
    private id: string,
    private weight: number,
    private height: number,
    private kcal: number,
    private allergies: string[],
    private favourites: string[],
    private hated: string[],
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

  public getKcal = (): number => {
    return this.kcal;
  };

  public getAllergies = (): string[] => {
    return this.allergies;
  };

  public getFavourites = (): string[] => {
    return this.favourites;
  };

  public getHated = (): string[] => {
    return this.hated;
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
      kcal: this.kcal,
      allergies: this.allergies,
      favourites: this.favourites,
      hated: this.hated,
      age: this.getAge(),
      activity: this.getActivity(),
    };
  }
}

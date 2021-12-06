import { ID } from '../../../Shared/Domain/VO/Id.vo';
import { Gender } from './VO/Gender.vo';
import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";

export class Nutrition extends AggregateRoot {
  public static build(
    userId: ID,
    weight: number,
    height: number,
    age: number,
    gender: Gender
  ): Nutrition {
    return new Nutrition(ID.generate(), userId, weight, height, age, gender);
  }

  constructor(
    _id: ID,
    private _userId: ID,
    private _weight: number,
    private _height: number,
    private _age: number,
    private _gender: Gender,
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public userId(): string {
    return this._userId.value;
  }

  public weight(): number {
    return this._weight;
  }

  public height(): number {
    return this._height;
  }

  public age(): number {
    return this._age;
  }

  public gender(): string {
    return this._gender.value;
  }
}

import { ID } from '../../../Shared/Domain/VO/Id.vo';
import { Gender } from './VO/Gender.vo';
import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";
import { KcalCalculator } from "./KcalCalculator";

export class Nutrition extends AggregateRoot {
  private readonly kcalCalculator = new KcalCalculator();

  public static build(
    userId: ID,
    adminId: ID,
    weight: number,
    height: number,
    age: number,
    gender: Gender
  ): Nutrition {
    return new Nutrition(ID.generate(), userId, adminId, weight, height, age, gender);
  }

  constructor(
    _id: ID,
    private _userId: ID,
    private _adminId: ID,
    private _weight: number,
    private _height: number,
    private _age: number,
    private _gender: Gender,
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public maintenanceKcal(): number {
    return this.kcalCalculator.calculate(this);
  }

  public userId(): string {
    return this._userId.value;
  }

  public adminId(): string {
    return this._adminId.value;
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

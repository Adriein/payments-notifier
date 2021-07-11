import { ID } from '../VO/Id.vo';

export abstract class BaseEntity {
  constructor(
    private _id: ID,
    private _dateCreated: Date,
    private _dateUpdated: Date
  ) {}

  public abstract serialize(): Object;

  public id(): string {
    return this._id.value;
  }

  public createdAt(): Date {
    return this._dateCreated;
  }

  public updatedAt(): Date {
    return this._dateUpdated;
  }
}

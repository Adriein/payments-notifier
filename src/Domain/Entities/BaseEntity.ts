import { ID } from '../../Shared/Domain/VO/Id.vo';

export abstract class BaseEntity {
  constructor(
    private _id: ID,
    private _dateCreated?: Date,
    private _dateUpdated?: Date
  ) {
  }

  public id(): string {
    return this._id.value;
  }

  public createdAt(): Date {
    return this._dateCreated ? this._dateCreated : new Date();
  }

  public updatedAt(): Date {
    return this._dateUpdated ? this._dateUpdated : new Date();
  }

  public updated(): void {
    this._dateUpdated = new Date();
  }
}

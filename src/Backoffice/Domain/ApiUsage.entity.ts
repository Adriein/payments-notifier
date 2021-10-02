import { BaseEntity } from '../../Domain/Entities/BaseEntity';
import { ID } from '../../Shared/Domain/VO/Id.vo';

export class ApiUsage extends BaseEntity {
  public static build(userId: ID, calls: number): ApiUsage {
    return new ApiUsage(ID.generate(), userId, calls);
  }

  constructor(_id: ID, private _userId: ID, private _apiCalls: number, _dateCreated?: Date, _dateUpdated?: Date) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public userId(): string {
    return this._userId.value;
  }

  public apiCalls(): number {
    return this._apiCalls;
  }

  public serialize(): Object {
    throw new Error('Method not implemented.');
  }
}

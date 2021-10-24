import { BaseEntity } from "../../Domain/Entities/BaseEntity";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { Nullable } from "../../Shared/Domain/types";

export class Pricing extends BaseEntity {
  public static build(name: string, duration: number, price: number, userId: Nullable<ID>): Pricing {
    return new Pricing(
      ID.generate(),
      name,
      duration,
      price,
      userId
    );
  }

  constructor(
    _id: ID,
    private _name: string,
    private _duration: number,
    private _price: number,
    private _userId: Nullable<ID>
  ) {
    super(_id);
  }

  public name(): string {
    return this._name;
  }

  public duration(): number {
    return this._duration;
  }

  public price(): number {
    return this._price;
  }

  public userId(): Nullable<ID> {
    return this._userId;
  }
}
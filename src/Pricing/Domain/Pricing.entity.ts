import { BaseEntity } from "../../Domain/Entities/BaseEntity";
import { ID } from "../../Shared/Domain/VO/Id.vo";

export class Pricing extends BaseEntity {
  public static build(name: string, duration: number, price: number): Pricing {
    return new Pricing(
      ID.generate(),
      name,
      duration,
      price
    );
  }

  constructor(
    _id: ID,
    private _name: string,
    private _duration: number,
    private _price: number
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
}
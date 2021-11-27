import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";
import { IPricingProps } from "./IPricingProps";


export class Pricing extends AggregateRoot implements IPricingProps {

  public static build(name: string, duration: number, price: number, adminId: ID): Pricing {
    return new Pricing(
      ID.generate(),
      name,
      duration,
      price,
      adminId
    );
  }

  constructor(
    _id: ID,
    private _name: string,
    private _duration: number,
    private _price: number,
    private _adminId: ID
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

  public adminId(): ID {
    return this._adminId;
  }
}
import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { Pricing } from "../../Domain/Pricing.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { IPricingModel } from "./IPricingModel";

export class PricingMapper implements IMapper<Pricing, IPricingModel> {
  public toDataModel(domain: Pricing): IPricingModel {
    throw new Error();
  }

  public toDomain(dataModel: IPricingModel): Pricing {
    return new Pricing(
      new ID(dataModel.id),
      dataModel.pricing_name,
      dataModel.duration,
      dataModel.amount,
    );
  }

}
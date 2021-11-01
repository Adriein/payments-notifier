import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { PricingDao } from "./Pricing.dao";
import { Pricing } from "../../Domain/Pricing.entity";
import { DateUtils } from "../../../../Shared/Infrastructure/Helper/Date.utils";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class PricingMapper implements IMapper<Pricing, PricingDao> {
  toDataModel(domain: Pricing): PricingDao {
    const dao = new PricingDao();

    dao.id = domain.id();
    dao.pricing_name = domain.name();
    dao.amount = domain.price();
    dao.duration = domain.duration();
    dao.user_id = domain.userId() !== null ? domain.userId()!.value : null;
    dao.created_at = DateUtils.format(domain.createdAt(), DateUtils.STANDARD_DATE_FORMAT);
    dao.updated_at = DateUtils.format(domain.updatedAt(), DateUtils.STANDARD_DATE_FORMAT);

    return dao;
  }

  toDomain(datamodel: PricingDao): Pricing {
    return new Pricing(
      new ID(datamodel.id),
      datamodel.pricing_name,
      datamodel.duration,
      datamodel.amount,
      datamodel.user_id ? new ID(datamodel.user_id) : null,
    );
  }

}
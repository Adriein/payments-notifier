import { IMapper } from "../../../../Shared/Domain/Interfaces/IMapper";
import { Pricing } from "../../Domain/Pricing.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Prisma } from "@prisma/client";

export class PricingMapper implements IMapper<Pricing, Prisma.pricingCreateInput | Prisma.pricingUpdateInput> {
  public toDomain(dataModel: Prisma.pricingWhereInput): Pricing {
    return new Pricing(
      new ID(dataModel.id! as string),
      dataModel.pricing_name! as string,
      dataModel.duration! as number,
      dataModel.amount! as number,
      new ID(dataModel.user_id! as string)
    );
  }

  toSaveDataModel<C extends Prisma.pricingCreateInput>(domain: Pricing): Prisma.pricingCreateInput {
    return {
      id: domain.id(),
      pricing_name: domain.name(),
      duration: domain.duration(),
      amount: domain.price(),
      user_id: domain.adminId().value,
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt()
    }
  }

  toUpdateDataModel<C extends Prisma.pricingUpdateInput>(domain: Pricing): Prisma.pricingUpdateInput {
    throw new Error(' not implemented ');
  }
}
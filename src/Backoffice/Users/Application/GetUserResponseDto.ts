import { User } from "../Domain/User.entity";
import { PricingResponseDto } from "../../Pricing/Application/PricingResponse.dto";

export class GetUserResponseDto {
  public constructor(
    public readonly user: User,
    public readonly pricing: PricingResponseDto
  ) {
  }
}
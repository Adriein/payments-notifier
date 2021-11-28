import { ID } from "../../../Shared/Domain/VO/Id.vo";

export interface IPricingProps {
  id(): string;

  name(): string;

  duration(): number;

  price(): number;

  adminId(): ID;

  createdAt(): Date;

  updatedAt(): Date;
}
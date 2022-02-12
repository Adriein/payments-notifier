import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Either } from "../../../Shared/Domain/types";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { Subscription } from "./Entity/Subscription.entity";

export interface ISubscriptionRepository extends IRepository<Subscription> {
  
}
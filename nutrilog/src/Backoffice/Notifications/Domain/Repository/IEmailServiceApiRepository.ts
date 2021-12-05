import { Either } from "../../../../Shared/Domain/types";
import { EventTrackingStatCollection } from "../Entity/EventTrackingStatCollection.entity";

export interface IEmailServiceApiRepository {
  getSmtpServiceStats(from: Date, to: Date): Promise<Either<Error, EventTrackingStatCollection>>;
}
import { IAppFilterRepository } from "../../Domain/IAppFilterRepository";
import { Either } from "../../../../Shared/Domain/types";
import { AppFilter } from "../../Domain/Entity/AppFilter.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { AppFilterFilter } from "../../Domain/Filter/AppFilterFilter";

export class AppFilterRepository implements IAppFilterRepository {
  delete(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria: Criteria<AppFilterFilter>): Promise<Either<Error, AppFilter[]>> {
    throw new Error();
  }

  findOne(id: string): Promise<Either<Error, AppFilter>> {
    throw new Error();
  }

  save(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

}
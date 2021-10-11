import { AbstractDAO } from "../../../Shared/Infrastructure/Data/AbstractDAO";
import { column } from "../../../Shared/Infrastructure/Decorators/column";

export class UserConfigDAO extends AbstractDAO<UserConfigDAO> {
  protected table: string = 'config';

  @column() public id: string | undefined;

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria: any): Promise<UserConfigDAO[] | undefined> {
    return Promise.resolve(undefined);
  }

  getOne(relations: string[] | undefined): Promise<UserConfigDAO | undefined> {
    return Promise.resolve(undefined);
  }

  save(): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(): Promise<void> {
    return Promise.resolve(undefined);
  }

}
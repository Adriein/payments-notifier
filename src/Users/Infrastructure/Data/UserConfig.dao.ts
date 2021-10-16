import { AbstractDAO } from "../../../Shared/Infrastructure/Data/AbstractDAO";
import { Column } from "../../../Shared/Infrastructure/Decorators/Orm/Column";

export class UserConfigDAO extends AbstractDAO<UserConfigDAO> {
  protected table: string = 'config';

  @Column() public id: string | undefined;

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
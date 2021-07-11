import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';

export class DietDAO extends AbstractDAO<DietDAO> {
  public getOne(id: string): Promise<DietDAO | undefined> {
    throw new Error('Method not implemented.');
  }
  public find(criteria?: any): Promise<DietDAO[] | undefined> {
    throw new Error('Method not implemented.');
  }
  public save(entity: DietDAO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public update(entity: DietDAO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

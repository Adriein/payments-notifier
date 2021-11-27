import { Criteria } from '../../../../Shared/Domain/Entities/Criteria';
import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { Diet } from '../../Domain/Diet.entity';
import { IDietRepository } from '../../Domain/IDietRepository';
import { DietDAO } from './Diet.dao';
import { DietMapper } from './DietMapper';

export class DietRepository implements IDietRepository {
  private mapper: IMapper<Diet, DietDAO> = new DietMapper();

  public async findOne(id: string): Promise<Diet | undefined> {
    throw new Error('Method not implemented.');
  }

  public async find(criteria: any): Promise<Diet[]> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: Diet): Promise<void> {

  }

  public async update(entity: Diet): Promise<void> {

  }

  public async delete(entity: Diet): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findAll(nutritionId: string): Promise<Diet[]> {
    throw new Error();
  }

  public async getLastDiet(): Promise<Diet | undefined> {
    throw new Error('Method not implemented.');
  }
}

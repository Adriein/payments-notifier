import { Criteria } from '../../../../Shared/Domain/Entities/Criteria';
import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { Diet } from '../../Domain/Diet.entity';
import { IDietRepository } from '../../Domain/IDietRepository';
import { DietMapper } from './DietMapper';
import { Either } from "../../../../Shared/Domain/types";

export class DietRepository implements IDietRepository {

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

  find(adminId: string): Promise<Either<Error, Diet[]>> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<Either<Error, Diet>> {
    throw new Error('Method not implemented.');
  }
}

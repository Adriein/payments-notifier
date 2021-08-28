import { IRepository } from '../../Shared/Domain/Interfaces/IRepository';
import { Diet } from './Diet.entity';

export interface IDietRepository extends IRepository<Diet> {
  findAll(nutritionId: string): Promise<Diet[]>;
}

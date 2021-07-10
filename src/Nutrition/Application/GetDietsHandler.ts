import { Log } from '../../Domain/Decorators/Log';
import { Diet } from '../Domain/Diet.entity';
import { IHandler } from '../../Domain/Interfaces';

export class GetDietsHandler implements IHandler<Diet[]> {
  @Log(process.env.LOG_LEVEL)
  public async handle(): Promise<Diet[]> {
    return [] as Diet[];
  }
}

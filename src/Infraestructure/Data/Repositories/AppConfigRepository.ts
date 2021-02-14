import { Log } from '../../../Domain/Decorators/Log';
import { GenericRepository } from './GenericRepository';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { AppConfigMapper } from '../Mappers/AppConfigMapper';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';

export class AppConfigRepository
  extends GenericRepository<AppConfig>
  implements IConfigRepository {
  constructor(protected entity: string, protected mapper: AppConfigMapper) {
    super(entity, mapper);
  }

  @Log(process.env.LOG_LEVEL)
  public async findByAdminId(id: string): Promise<AppConfig | undefined> {
    const { rows } = await this.db.query(
      `SELECT * FROM ${this.entity} WHERE user_id='${id}';`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }

  @Log(process.env.LOG_LEVEL)
  public async save(config: AppConfig): Promise<void> {
    const datamodel = this.mapper.datamodel(config);

    await this.db.query(this.buildInsertQuery(datamodel));
  }
}

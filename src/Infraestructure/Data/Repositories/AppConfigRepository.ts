import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { UserMapper } from '../Mappers/UserMapper';
import { GenericRepository } from './GenericRepository';
import { Criteria } from '../../../Domain/Entities/Criteria.entity';
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
      `SELECT * FROM ${this.entity} WHERE admin_id='${id}';`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }
}

import { CONFIG_TABLE, SUBSCRIPTIONS_TABLE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Email } from '../../../Domain/VO/Email.vo';
import { UserMapper } from '../Mappers/UserMapper';
import { GenericRepository } from './GenericRepository';
import { v4 as uuidv4 } from 'uuid';
import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { Filter } from '../../../Domain/Entities/Filter.entity';

export class UserRepository
  extends GenericRepository<User>
  implements IUserRepository {
  constructor(protected entity: string, protected mapper: UserMapper) {
    super(entity, mapper);
  }

  @Log(process.env.LOG_LEVEL)
  async find(criteria: Criteria): Promise<User[]> {
    const where = this.criteriaToSQL(criteria);
    const query = `SELECT users.id, users.username, users.email, users.password, users.owner_id, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${
      this.entity
    } LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE config.role='user' AND subscriptions.active=true ${where.join(
      ' '
    )};`;

    const { rows } = await this.db.query(query);

    return rows.map((row) => this.mapper.domain(row));
  }

  @Log(process.env.LOG_LEVEL)
  async findById(id: string): Promise<User | undefined> {
    const { rows } = await this.db.query(
      `SELECT users.id, users.username, users.email, users.password, users.owner_id, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${this.entity} LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE users.id='${id}' AND subscriptions.active=true;`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }

  @Log(process.env.LOG_LEVEL)
  async findByEmail(email: Email): Promise<User | undefined> {
    const { rows } = await this.db.query(
      `SELECT users.id, users.username, users.email, users.password, users.owner_id, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${this.entity} LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE email='${email.email}' AND subscriptions.active=true;`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }

  @Log(process.env.LOG_LEVEL)
  async findAll(): Promise<User[]> {
    const { rows } = await this.db.query(
      `SELECT users.id, users.username, users.email, users.password, users.owner_id, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${this.entity} LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE config.role='user' AND subscriptions.active=true;`
    );

    return rows.map((row) => this.mapper.domain(row));
  }

  @Log(process.env.LOG_LEVEL)
  async save(user: User): Promise<void> {
    const datamodel = this.mapper.datamodel(user);

    await this.db.query(this.buildInsertQuery(datamodel));

    await this.db.query(
      `INSERT INTO ${CONFIG_TABLE} VALUES ($1, $2, $3, $4, $5, $6);`,
      [
        uuidv4(),
        user.lang(),
        user.role(),
        user.sendNotifications(),
        user.sendWarnings(),
        user.getId(),
      ]
    );

    if (user.hasSubscription()) {
      await this.db.query(
        `INSERT INTO ${SUBSCRIPTIONS_TABLE} VALUES ('${user.subscriptionId()}', '${JSON.stringify(
          user.pricing().pricingType
        )}', '${user.paymentDate()}', '${user.isWarned()}', '${user.isNotified()}', '${user.getId()}', '${user.isSubscriptionActive()}');`
      );
    }
  }

  @Log(process.env.LOG_LEVEL)
  async update(user: User): Promise<void> {
    if (user.hasSubscription()) {
      await this.db.query(
        `UPDATE ${SUBSCRIPTIONS_TABLE}
         SET pricing='${JSON.stringify(
           user.pricing().pricingType
         )}', payment_date='${user.paymentDate()}', warned=${user.isWarned()}, notified=${user.isNotified()}, user_id='${user.getId()}', active=${user.isSubscriptionActive()} WHERE id='${user.subscriptionId()}';`
      );
    }

    await this.db.query(
      `UPDATE ${this.entity}
       SET username='${user.getName()}', email='${user.getEmail()}', password='${user.getPassword()}', owner_id='${
        user.ownerId
      }'
       WHERE id='${user.getId()}';`
    );
  }

  @Log(process.env.LOG_LEVEL)
  async delete(id: string): Promise<void> {
    await this.db.query(`DELETE FROM ${this.entity} WHERE id='${id}'`);
  }

  @Log(process.env.LOG_LEVEL)
  async updateUserNotifications(
    configId: string,
    sendWarnings: boolean
  ): Promise<void> {
    await this.db.query(
      `UPDATE ${CONFIG_TABLE} SET send_warnings=${sendWarnings} WHERE id='${configId}';`
    );
  }

  @Log(process.env.LOG_LEVEL)
  async insertNewSubscription(user: User): Promise<void> {
    if (user.hasSubscription()) {
      await this.db.query(
        `INSERT INTO ${SUBSCRIPTIONS_TABLE}
        VALUES ('${user.subscriptionId()}', '${JSON.stringify(
          user.pricing().pricingType
        )}', '${user.paymentDate()}', ${user.isWarned()}, ${user.isNotified()}, '${user.getId()}', ${user.isSubscriptionActive()});`
      );
    }
  }

  protected criteriaToSQL(criteria: Criteria) {
    return criteria.filters.map(
      (filter: Filter) =>
        `AND ${
          filter.field === 'pricing' ? 'subscriptions.pricing' : filter.field
        } ${filter.operator} '${filter.value}'`
    );
  }
}

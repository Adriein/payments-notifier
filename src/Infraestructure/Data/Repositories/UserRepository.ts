import { CONFIG_TABLE, SUBSCRIPTIONS_TABLE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { Email } from '../../../Shared/Domain/VO/Email.vo';
import { UserMapper } from '../Mappers/UserMapper';
import { GenericRepository } from './GenericRepository';
import { v4 as uuidv4 } from 'uuid';
import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { CriteriaMapper } from '../Mappers/CriteriaMapper';
import { Subscription } from '../../../Domain/Entities/Subscription.entity';
import { SubscriptionMapper } from '../Mappers/SubscriptionMapper';

export class UserRepository
  extends GenericRepository<User>
  implements IUserRepository {
  constructor(
    protected entity: string,
    protected mapper: UserMapper,
    protected criteriaMapper: CriteriaMapper,
    protected subscriptionMapper: SubscriptionMapper
  ) {
    super(entity, mapper, criteriaMapper);
  }

  @Log(process.env.LOG_LEVEL)
  async find(adminId: string, criteria?: Criteria): Promise<User[]> {
    const where = criteria
      ? await this.criteriaMapper.sql(criteria, [
        'users',
        'subscriptions',
        'config',
      ])
      : undefined;

    const query = `SELECT users.id, users.username, users.email, users.password, users.owner_id, users.created_at, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${
      this.entity
    } LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE config.role='user' AND users.owner_id='${adminId}' AND subscriptions.active=true ${
      where ? where.join(' ') : ''
    };`;

    const {rows} = await this.db.query(query);

    return rows.map((row) => this.mapper.domain(row));
  }

  @Log(process.env.LOG_LEVEL)
  async findById(id: string): Promise<User | undefined> {
    const {rows} = await this.db.query(
      `SELECT users.id, users.username, users.email, users.password, users.owner_id, users.created_at, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${this.entity} LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE users.id='${id}' AND subscriptions.active=true;`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }

  @Log(process.env.LOG_LEVEL)
  async findByEmail(email: Email): Promise<User | undefined> {
    const {rows} = await this.db.query(
      `SELECT users.id, users.username, users.email, users.password, users.owner_id, users.created_at, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${this.entity} LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE email='${email.value}' AND subscriptions.active=true;`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }

  @Log(process.env.LOG_LEVEL)
  async findAll(onlyAdmins: boolean): Promise<User[]> {
    const {rows} = await this.db.query(
      `SELECT users.id, users.username, users.email, users.password, users.owner_id, users.created_at, subscriptions.id as subscriptions_id, subscriptions.pricing, subscriptions.payment_date, subscriptions.warned, subscriptions.notified, subscriptions.active, config.id as config_id, config.language, config.role, config.send_notifications, config.send_warnings FROM ${
        this.entity
      } LEFT JOIN subscriptions ON users.id = subscriptions.user_id JOIN config ON users.id = config.user_id WHERE config.role='${
        onlyAdmins ? 'admin' : 'user'
      }' AND subscriptions.active=true;`
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
        user.id(),
      ]
    );

    if (user.hasSubscription()) {
      await this.db.query(
        `INSERT INTO ${SUBSCRIPTIONS_TABLE} VALUES ('${user.subscriptionId()}', '${JSON.stringify(
          user.pricing().value
        )}', '${user.paymentDate()}', '${user.isWarned()}', '${user.isNotified()}', '${user.id()}', '${user.isSubscriptionActive()}');`
      );
    }
  }

  @Log(process.env.LOG_LEVEL)
  async update(user: User): Promise<void> {
    if (user.hasSubscription()) {
      await this.db.query(
        `UPDATE ${SUBSCRIPTIONS_TABLE}
         SET pricing='${JSON.stringify(
          user.pricing().value
        )}', payment_date='${user.paymentDate()}', warned=${user.isWarned()}, notified=${user.isNotified()}, user_id='${user.id()}', active=${user.isSubscriptionActive()} WHERE id='${user.subscriptionId()}';`
      );
    }

    await this.db.query(
      `UPDATE ${this.entity}
       SET username='${user.getName()}', email='${user.getEmail()}', password='${user.getPassword()}', owner_id='${
        user.ownerId
      }'
       WHERE id='${user.id()}';`
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
          user.pricing().value
        )}', '${user.paymentDate()}', ${user.isWarned()}, ${user.isNotified()}, '${user.id()}', ${user.isSubscriptionActive()});`
      );
    }
  }

  @Log(process.env.LOG_LEVEL)
  async getAllSubscriptionsByUser(id: string): Promise<Subscription[]> {
    const {rows} = await this.db.query(
      `SELECT * FROM ${SUBSCRIPTIONS_TABLE} WHERE user_id = '${id}'`
    );

    return rows.map((row) => this.subscriptionMapper.domain(row));
  }

  @Log(process.env.LOG_LEVEL)
  async updatePassword(id: string, password: string): Promise<void> {
    await this.db.query(
      `UPDATE ${this.entity} SET password='${password}' WHERE id = '${id}'`
    );
  }
}

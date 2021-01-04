import { SUBSCRIPTIONS_TABLE } from '../../../domain/constants';
import { Log } from '../../../domain/Decorators/Log';
import { User } from '../../../domain/entities/User.entity';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { Email } from '../../../domain/VO/Email.vo';
import { UserMapper } from '../Mappers/UserMapper';
import { GenericRepository } from './GenericRepository';

export class UserRepository
  extends GenericRepository<User>
  implements IUserRepository {
  constructor(protected entity: string, protected mapper: UserMapper) {
    super(entity, mapper);
  }

  @Log(process.env.LOG_LEVEL)
  async findByName(username: string): Promise<User> {
    throw new Error();
  }

  @Log(process.env.LOG_LEVEL)
  async findByEmail(email: Email): Promise<User | undefined> {
    const { rows } = await this.db.query(
      `SELECT * FROM ${this.entity} WHERE email='${email.email}';`
    );

    if (rows.length < 1) {
      return undefined;
    }

    if (rows[0].subscription_id !== null) {
      const result = await this.db.query(
        `SELECT * FROM ${SUBSCRIPTIONS_TABLE} WHERE id='${rows[0].subscription_id}';`
      );
      return this.mapper.domain(rows[0], result.rows[0]);
    }

    return this.mapper.domain(rows[0]);
  }

  @Log(process.env.LOG_LEVEL)
  async findAll(): Promise<User[]> {
    const { rows } = await this.db.query(`SELECT * FROM ${this.entity}`);

    return rows.map((row) => this.mapper.domain(row));
  }
  
  @Log(process.env.LOG_LEVEL)
  async save(user: User): Promise<void> {
    const datamodel = this.mapper.datamodel(user);

    if (user.hasSubscription()) {
      await this.db.query(
        `INSERT INTO ${SUBSCRIPTIONS_TABLE} VALUES ('${user.subscriptionId()}', '${user.getPricing()}', '${user.getPaymentDate()}', '${user.getIsWarned()}', '${user.getIsNotified()}');`
      );
    }

    await this.db.query(this.buildInsertQuery(datamodel));
  }

  @Log(process.env.LOG_LEVEL)
  async update(user: User): Promise<void> {

    if (user.hasSubscription()) {
      await this.db.query(
        `UPDATE ${SUBSCRIPTIONS_TABLE}
         SET pricing='${user.getPricing()}', payment_date='${user.getPaymentDate()}', warned='${user.getIsWarned()}', notified='${user.getIsNotified()}'
         WHERE id='${user.subscriptionId()}';`
      );
    }

    await this.db.query(
      `UPDATE ${this.entity}
       SET username='${user.getName()}', email='${user.getEmail()}', password='${user.getPassword()}', subscription_id='${user.subscriptionId()}'
       WHERE id='${user.getId()}';`
    );
  }

  @Log(process.env.LOG_LEVEL)
  async delete(subscriptionId: string): Promise<void> {
    await this.db.query(`DELETE FROM ${SUBSCRIPTIONS_TABLE} WHERE id='${subscriptionId}'`);
  }
}

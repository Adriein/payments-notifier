import { Criteria } from '../../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../../Shared/Infrastructure/Decorators/Orm/Column';
import { SubscriptionDAO } from "./Subscription.dao";
import { UserConfigDAO } from "./UserConfig.dao";
import { Nullable } from "../../../../Shared/Domain/types";
import { Model } from "../../../../Shared/Infrastructure/Decorators/Orm/Model";
import { OneToMany } from "../../../../Shared/Infrastructure/Decorators/Orm/OneToMany";
import { OneToOne } from "../../../../Shared/Infrastructure/Decorators/Orm/OneToOne";
import { PrimaryColumn } from "../../../../Shared/Infrastructure/Decorators/Orm/PrimaryColumn";

@Model('users')
export class UserDAO extends AbstractDAO<UserDAO> {

  @PrimaryColumn() public id!: string;
  @Column() public username!: string;
  @Column() public email!: string;
  @Column() public password!: string;
  @Column() public owner_id!: string;
  @Column() public created_at!: string;
  @Column() public updated_at!: string;

  @OneToMany('subscriptions', 'user_id', SubscriptionDAO)
  public subscriptions: SubscriptionDAO[] = [];
  @OneToOne('config', 'user_id', UserConfigDAO)
  public userConfig: Nullable<UserConfigDAO> = null;

  public async getOne(): Promise<UserDAO | undefined> {
    return await super.getOne(this.id);
  }

  public async find(criteria?: Criteria): Promise<UserDAO[]> {
    const results = await super.find(criteria);

    const stack = new Map<string, UserDAO>();

    for (const dao of results) {
      if (stack.has(dao.id!)) {
        const userDAO = stack.get(dao.id!)!;
        userDAO.subscriptions = [ ...userDAO.subscriptions, ...dao.subscriptions ];
        continue;
      }

      stack.set(dao.id!, dao);
    }

    return [ ...stack.values() ];
  }

  public async save(): Promise<void> {
    await super.save(this);
  }

  public async update(): Promise<void> {
    await super.update(this);
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

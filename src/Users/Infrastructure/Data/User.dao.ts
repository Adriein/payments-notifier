import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../Shared/Infrastructure/Decorators/Orm/Column';
import { SubscriptionDAO } from "./Subscription.dao";
import { UserConfigDAO } from "./UserConfig.dao";
import { Nullable } from "../../../Shared/Domain/types";
import { Model } from "../../../Shared/Infrastructure/Decorators/Orm/Model";
import { TABLE_NAME_METADATA } from "../../../Shared/Domain/constants";
import { OneToMany } from "../../../Shared/Infrastructure/Decorators/Orm/OneToMany";

@Model('users')
export class UserDAO extends AbstractDAO<UserDAO> {

  @Column() public id!: string;
  @Column() public username!: string;
  @Column() public email!: string;
  @Column() public password!: string;
  @Column() public owner_id!: string;
  @Column() public created_at!: string;
  @Column() public updated_at!: string;

  @OneToMany('subscriptions', 'user_id')
  public subscriptions: SubscriptionDAO[] = [];
  @OneToMany('config', 'user_id')
  public userConfig: Nullable<UserConfigDAO> = null;

  public async getOne(): Promise<UserDAO | undefined> {
    return await super.getOne(this.id);
  }

  public async find(criteria: Criteria): Promise<UserDAO[]> {
    return await super.find(criteria);
  }

  public async save(): Promise<void> {
    await super.save(this);
  }

  public update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

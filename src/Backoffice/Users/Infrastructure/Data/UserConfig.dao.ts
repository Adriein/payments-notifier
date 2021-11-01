import { AbstractDAO } from "../../../../Shared/Infrastructure/Data/AbstractDAO";
import { Column } from "../../../../Shared/Infrastructure/Decorators/Orm/Column";
import { Model } from "../../../../Shared/Infrastructure/Decorators/Orm/Model";
import { PrimaryColumn } from "../../../../Shared/Infrastructure/Decorators/Orm/PrimaryColumn";

@Model('config')
export class UserConfigDAO extends AbstractDAO<UserConfigDAO> {

  @PrimaryColumn() public id!: string;
  @Column() public language!: string;
  @Column() public role!: string;
  @Column() public send_notifications!: boolean;
  @Column() public send_warnings!: boolean;
  @Column() public user_id!: string;
  @Column() public created_at!: string;
  @Column() public updated_at!: string;

  public async save(): Promise<void> {
    await super.save(this);
  }

  public async update(): Promise<void> {
    return super.update(this);
  }

}
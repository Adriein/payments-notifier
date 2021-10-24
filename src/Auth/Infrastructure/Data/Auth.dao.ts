import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { AbstractDAO } from '../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../Shared/Infrastructure/Decorators/Orm/Column';
import { Model } from "../../../Shared/Infrastructure/Decorators/Orm/Model";

@Model('users')
export class AuthDAO extends AbstractDAO<AuthDAO> {
  @Column() public id: string | undefined;
  @Column() public username: string | undefined;
  @Column() public email: string | undefined;
  @Column() public password: string | undefined;
  @Column() public owner_id: string | undefined;
  @Column() public created_at: string | undefined;
  @Column() public updated_at: string | undefined;

}

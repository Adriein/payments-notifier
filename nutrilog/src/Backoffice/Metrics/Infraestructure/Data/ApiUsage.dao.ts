import { AbstractDAO } from '../../../../Shared/Infrastructure/Data/AbstractDAO';
import { Column } from '../../../../Shared/Infrastructure/Decorators/Orm/Column';
import { Model } from "../../../../Shared/Infrastructure/Decorators/Orm/Model";

@Model('nutritionix_api_metadata')
export class ApiUsageDAO extends AbstractDAO<ApiUsageDAO> {
  @Column() public id: string | undefined;
  @Column() public user_id: string | undefined;
  @Column() public api_calls: number | undefined;
  @Column() public created_at: string | undefined;
  @Column() public updated_at: string | undefined;

  constructor(
    public _id?: string,
    public _user_id?: string,
    public _api_calls?: number,
    public _created_at?: string,
    public _updated_at?: string
  ) {
    super();
    this.id = _id;
    this.user_id = _user_id;
    this.api_calls = _api_calls;
    this.created_at = _created_at;
    this.updated_at = _updated_at;
  }
}

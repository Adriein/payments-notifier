import { EmailHeader } from "./EmailHeader.entity";
import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../Shared/Domain/VO/Id.vo";

export class NutrilogEmail<T> extends AggregateRoot {
  constructor(_id: ID, private header: EmailHeader, private body: T) {
    super(_id);
  }

  public hasPrefabTemplate(): boolean {
    return !!this.header.templateId();
  }
}

/*
 * Email:
 * -from
 * -to
 * -template id
 * -template data
 * */


/*
 * Email types:
 * -about to expire (not have template)
 * -contact email
 * -expired email
 * -report
 * */
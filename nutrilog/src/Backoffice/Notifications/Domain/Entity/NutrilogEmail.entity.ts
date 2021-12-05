import { EmailHeader } from "./EmailHeader.entity";
import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class NutrilogEmail<T> extends AggregateRoot {
  public static build<T>(header: EmailHeader, body: T) {
    return new NutrilogEmail(ID.generate(), header, body);
  }

  constructor(_id: ID, private header: EmailHeader, private body: T) {
    super(_id);
  }

  public hasPrefabTemplate(): boolean {
    return !!this.header.templateId();
  }

  public subject(): string {
    return this.header.subject();
  }

  public sender(): string {
    return this.header.sender();
  }

  public recipient(): string {
    return this.header.recipient();
  }

  public templateId(): string | undefined {
    return this.header.templateId();
  }

  public content(): T {
    return this.body;
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
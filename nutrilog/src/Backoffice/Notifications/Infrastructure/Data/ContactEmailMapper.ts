import { IEmailMapper } from "../../Domain/IEmailMapper";
import { NutrilogEmail } from "../../Domain/Entity/NutrilogEmail.entity";
import { ContactEmailModel } from "./ContactEmailModel";

export class ContactEmailMapper implements IEmailMapper<NutrilogEmail<string>, ContactEmailModel> {
  toDataModel(domain: NutrilogEmail<string>): ContactEmailModel {
    return {
      emailContent: domain.content(),
      subject: domain.subject(),
      sender: domain.sender()
    }
  }

  toDomain(dataModel: ContactEmailModel): NutrilogEmail<string> {
    throw new Error('not implemented');
  }
}
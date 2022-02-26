import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { IClientRepository } from "../../Domain/IClientRepository";
import { Client } from "../../Domain/Entity/Client.entity";

export class ClientFinder {
  constructor(private readonly repository: IClientRepository) {}

  public async execute(id: ID): Promise<Client> {
    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}
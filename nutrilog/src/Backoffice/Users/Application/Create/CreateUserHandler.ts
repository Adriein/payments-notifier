import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { CreateUserCommand } from "../../Domain/Command/CreateUserCommand";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserConfig } from "../../Domain/Entity/UserConfig.entity";
import { User } from "../../Domain/Entity/User.entity";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { LastPaymentDate } from "../../../../Shared/Domain/VO/LastPaymentDate.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UserAlreadyExistsError } from "../../Domain/UserAlreadyExistsError";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { USER_ROLE } from "../../Domain/constants";
import { CryptoService } from "../../../../Shared/Domain/Services/CryptoService";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IHandler<void> {
  constructor(
    private repository: IUserRepository,
    private queryBus: IQueryBus<SearchRoleResponse>,
    private readonly crypto: CryptoService
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateUserCommand): Promise<void> {
    const email = new Email(command.email);

    const result = await this.repository.findByEmail(email.value);

    if (result.isRight()) {
      throw new UserAlreadyExistsError();
    }

    const role = await this.queryBus.ask(new SearchRoleQuery(USER_ROLE));

    const password = await this.crypto.hash(Password.generate().value);

    const user = User.build(
      new ID(command.adminId),
      command.username,
      new Password(password),
      email,
      UserConfig.build(),
      Subscription.build(new ID(command.pricingId), new LastPaymentDate(command.lastPaymentDate)),
      new ID(role.id)
    );

    await this.repository.save(user);
  }
}
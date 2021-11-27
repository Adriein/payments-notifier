import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { SendContactEmailCommand } from "../Domain/Command/SendContactEmailCommand";
import { CommandHandler } from "../../../Shared/Domain/Decorators/CommandHandler.decorator";

@CommandHandler(SendContactEmailCommand)
export class SendContactEmailHandler implements IHandler<void> {
  public async handle(command: SendContactEmailCommand): Promise<void> {
    return Promise.resolve(undefined);
  }

}
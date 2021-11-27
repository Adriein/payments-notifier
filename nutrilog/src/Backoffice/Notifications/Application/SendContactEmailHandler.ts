import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { SendContactEmailCommand } from "../Domain/Command/SendContactEmailCommand";
import { CommandHandler } from "../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { Log } from "../../../Shared/Domain/Decorators/Log";

@CommandHandler(SendContactEmailCommand)
export class SendContactEmailHandler implements IHandler<void> {
  
  @Log(process.env.LOG_LEVEL)
  public async handle(command: SendContactEmailCommand): Promise<void> {
    return Promise.resolve(undefined);
  }

}
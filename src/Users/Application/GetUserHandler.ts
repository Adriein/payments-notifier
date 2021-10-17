import { Log } from '../../Shared/Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { ID } from '../../Shared/Domain/VO/Id.vo';
import { GetUserQuery } from '../Domain/Query/GetUserQuery';
import { User } from '../../Domain/Entities/User.entity';
import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { QueryHandler } from "../../Shared/Domain/Decorators/QueryHandler.decorator";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IHandler<User> {
  constructor(private repository: IUserRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: GetUserQuery): Promise<User> {
    const userId = new ID(command.userId);

    const user = await this.repository.findById(userId.value);

    if (!user) {
      throw new Error('Not user found');
    }

    return user;
  }
}

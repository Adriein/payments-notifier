import { UserChartCommand } from '../../../Domain/Commands/Chart/UserChartCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { Chart } from '../../../Domain/Entities/Chart.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { CriteriaBuilder } from '../../../Domain/Services/CriteriaBuilder';

export class CreateUserChartHandler implements IHandler<Chart> {
  constructor(private userRepository: IUserRepository, private criteriaBuilder: CriteriaBuilder) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<Chart> {
    const command = comm as UserChartCommand;
    const criteria = this.criteriaBuilder.build(command.criteria);
    const users = await this.userRepository.find(criteria);

    return new Chart([], []);
  }
}

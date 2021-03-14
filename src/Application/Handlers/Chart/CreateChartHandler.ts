import { UserChartCommand } from '../../../Domain/Commands/Chart/UserChartCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { Chart } from '../../../Domain/Entities/Chart.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { CriteriaBuilder } from '../../../Domain/Services/CriteriaBuilder';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { Time } from '../../../Infraestructure/Helpers/Time.utils';

export class CreateUserChartHandler implements IHandler<Chart> {
  constructor(
    private userRepository: IUserRepository,
    private criteriaBuilder: CriteriaBuilder
  ) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<Chart> {
    const command = comm as UserChartCommand;
    const users = await this.userRepository.findAll();

    const from = new LastPaymentDate(command.criteria.from.value).value;
    const to = new LastPaymentDate(command.criteria.to.value).value;

    const total: any[] = [];
    const months: any[] = [];

    const counter: { [key: string]: number } = {};

    for (const user of users) {    
      if (Time.between(user.createdAt, from, to)) {
        const month = Time.month(user.createdAt);
        counter[month] = counter[month]?  counter[month] + 1 : 1;
      }
    }

    for (const month in counter) {
      months.push(month);
      total.push(counter[month]);
    }

    return new Chart(months, total);
  }
}

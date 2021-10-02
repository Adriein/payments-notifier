import { UserChartCommand } from '../../../Domain/Commands/Chart/UserChartCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { Chart } from '../../../Domain/Entities/Chart.entity';
import { User } from '../../../Domain/Entities/User.entity';
import { IHandler } from '../../../Domain/Interfaces';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Counter } from '../../../Shared/Domain/types';
import { LastPaymentDate } from '../../../Shared/Domain/VO/LastPaymentDate.vo';
import { Time } from '../../../Infraestructure/Helpers/Time.utils';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class CreateUsersChartHandler implements IHandler<Chart> {
  constructor(private finder: UserFinder) {
  }

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<Chart> {
    const command = comm as UserChartCommand;
    const users = await this.finder.adminId(command.adminId).find();

    const from = new LastPaymentDate(command.criteria.from.value).value;
    const to = new LastPaymentDate(command.criteria.to.value).value;

    const total: number[] = [];
    const months: string[] = [];

    const counter = users.reduce((counter: Counter, user: User) => {
      if (Time.between(user.createdAt(), from, to)) {
        const month = Time.month(user.createdAt());
        counter[month] = counter[month] ? counter[month] + 1 : 1;
        return counter;
      }

      return counter;
    }, {});

    for (const month in counter) {
      months.push(month);
      total.push(counter[month]);
    }

    return new Chart(months, total);
  }
}

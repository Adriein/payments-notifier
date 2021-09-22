import { EarningsChartCommand } from '../../../Domain/Commands/Chart/EarningsChartCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { Chart } from '../../../Domain/Entities/Chart.entity';
import { Subscription } from '../../../Domain/Entities/Subscription.entity';
import { User } from '../../../Domain/Entities/User.entity';
import { IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { Counter } from '../../../Shared/Domain/types';
import { LastPaymentDate } from '../../../Domain/VO/LastPaymentDate.vo';
import { Time } from '../../../Infraestructure/Helpers/Time.utils';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class CreateMoneyChartHandler implements IHandler<Chart> {
  constructor(private repository: IUserRepository, private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<Chart> {
    const command = comm as EarningsChartCommand;
    const users = await this.finder.adminId(command.adminId).find();

    const subscriptions = await users.reduce(
      async (subscriptions, user: User) => {
        return [
          ...(await subscriptions),
          ...(await this.repository.getAllSubscriptionsByUser(
            user.id()
          )),
        ];
      },
      Promise.resolve<Subscription[]>([])
    );

    const from = new LastPaymentDate(command.criteria.from.value).value;
    const to = new LastPaymentDate(command.criteria.to.value).value;

    const counter = subscriptions.reduce(
      (counter: Counter, subscription: Subscription) => {
        const [pricingName] = Object.keys(subscription.pricing().value);

        if (Time.between(subscription.paymentDate(), from, to)) {
          const month = Time.month(subscription.paymentDate());

          counter[month] = counter[month]
            ? counter[month] + subscription.pricing().value[pricingName].price
            : subscription.pricing().value[pricingName].price;
          return counter;
        }

        return counter;
      },
      {}
    );

    const total: number[] = [];
    const months: string[] = [];

    for (const month in counter) {
      total.push(counter[month]);
      months.push(month);
    }

    return new Chart(months, total);
  }
}

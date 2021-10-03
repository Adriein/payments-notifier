import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { EarningsChartCommand } from '../../../../Domain/Commands/Chart/EarningsChartCommand';
import { OPERATORS } from '../../../../Domain/constants';
import { Chart } from '../../../../Domain/Entities/Chart.entity';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { get } from '../../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';

@Controller()
export class GetMoneyChartController {
  @get('/money-chart')
  @use(requireAuth)
  @use(currentUser)
  public async getMoneyChart(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      const chart: Chart = await commandBus.execute(
        new EarningsChartCommand(req.currentUser!.id, {
          from: {value: '2021-01-01', operation: OPERATORS.gte},
          to: {value: '2021-03-15', operation: OPERATORS.lte},
        })
      );

      res.status(200).send(chart.generateHashMap());
    } catch (error) {
      next(error);
    }
  }
}

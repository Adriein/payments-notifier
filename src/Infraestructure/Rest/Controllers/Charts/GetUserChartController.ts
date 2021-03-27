import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { UserChartCommand } from '../../../../Domain/Commands/Chart/UserChartCommand';
import { OPERATORS } from '../../../../Domain/constants';
import { Chart } from '../../../../Domain/Entities/Chart.entity';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { get } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

export class GetUserChartController {
  @get('/user-chart')
  @use(requireAuth)
  @use(currentUser)
  public async getUserChart(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      const chart: Chart = await commandBus.execute(
        new UserChartCommand(req.currentUser!.id, {
          from: { value: '2021-01-01', operation: OPERATORS.gte },
          to: { value: '2021-03-15', operation: OPERATORS.lte },
        })
      );

      res.status(200).send(chart.generateHashMap());
    } catch (error) {
      next(error);
    }
  }
}

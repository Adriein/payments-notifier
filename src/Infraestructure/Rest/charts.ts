import { currentUser, requireAuth } from '../../middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../Application/CommandBus/CommandBus';
import { UserChartCommand } from '../../Domain/Commands/Chart/UserChartCommand';
import { OPERATORS } from '../../Domain/constants';
import { Chart } from '../../Domain/Entities/Chart.entity';
import { EarningsChartCommand } from '../../Domain/Commands/Chart/EarningsChartCommand';

const router: Router = express.Router();
const commandBus = new CommandBus();

router.get(
  '/user-chart',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
);

router.get(
  '/money-chart',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chart: Chart = await commandBus.execute(
        new EarningsChartCommand(req.currentUser!.id, {
          from: { value: '2021-01-01', operation: OPERATORS.gte },
          to: { value: '2021-03-15', operation: OPERATORS.lte },
        })
      );

      res.status(200).send(chart.generateHashMap());
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/pricing-chart',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new Error();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export { router as charts };

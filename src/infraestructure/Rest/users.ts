import { requireAuth } from '../../middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../application/CommandBus/CommandBus';
import { User } from '../../domain/entities/User.entity';
import { ReadCalculatedReportCommand } from '../../domain/commands/User/ReadCalculatedReportCommand';
import { UpdateUserNotificationsCommand } from '../../domain/commands/User/UpdateUserNotificationsCommand';

const router: Router = express.Router();
const commandBus = new CommandBus();

router.get(
  '/calculatedReport',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = (await commandBus.execute(
        new ReadCalculatedReportCommand()
      )) as User[];

      res.status(200).send(users.map((user) => user.serialize()));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/users/config/notifications',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(
        new UpdateUserNotificationsCommand(
          req.body.email,
          req.body.config.sendWarnings
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export { router as users };

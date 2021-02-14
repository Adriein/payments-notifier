import { currentUser, requireAuth } from '../../middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../Application/CommandBus/CommandBus';
import { ReadAppConfigCommand } from '../../Domain/Commands/AppConfig/ReadAppConfigCommand';
import { AppConfig } from '../../Domain/Entities/AppConfig.entity';
import { CreateAppConfigCommand } from '../../Domain/Commands/AppConfig/CreateAppConfigCommand';

const router: Router = express.Router();
const commandBus = new CommandBus();

router.get(
  '/appConfig',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appConfig = (await commandBus.execute(
        new ReadAppConfigCommand(req.currentUser!.id)
      )) as AppConfig;

      res.status(200).send(appConfig.serialize());
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/appConfig',
  requireAuth,
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(
        new CreateAppConfigCommand(
          req.body.pricing,
          req.body.warningDelay,
          req.body.defaulterDelay,
          req.body.emailContent,
          req.body.currentUser!.id
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export { router as appConfig };

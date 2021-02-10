import { requireAuth } from '../../middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../Application/CommandBus/CommandBus';
import { User } from '../../Domain/Entities/User.entity';
import { ReadCalculatedReportCommand } from '../../Domain/Commands/User/ReadCalculatedReportCommand';
import { UpdateUserNotificationsCommand } from '../../Domain/Commands/User/UpdateUserNotificationsCommand';
import { CreateUserCommand } from '../../Domain/Commands/User/CreateUserCommand';
import { DeleteUserCommand } from '../../Domain/Commands/User/DeleteUserCommand';
import { RegisterUserPaymentCommand } from '../../Domain/Commands/User/RegisterUserPaymentCommand';
import { UpdateUserCommand } from '../../Domain/Commands/User/UpdateUserCommand';

const router: Router = express.Router();
const commandBus = new CommandBus();

router.get(
  '/calculatedReport',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Object.keys(req.query).length) {
        const users = (await commandBus.execute(
          new ReadCalculatedReportCommand(req.query)
        )) as User[];
        res.status(200).send(users.map((user) => user.serialize()));
        return;
      }

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
  '/users',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(
        new CreateUserCommand(
          req.body.username,
          req.body.email,
          req.body.pricing,
          req.body.lastPaymentDate
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/users',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(
        new UpdateUserCommand(
          req.body.id,
          req.body.username,
          req.body.email,
          req.body.pricing
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/users/:email',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(new DeleteUserCommand(req.params.email));
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/users/subscription/payment',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(new RegisterUserPaymentCommand(req.body.email));

      res.status(200).send();
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

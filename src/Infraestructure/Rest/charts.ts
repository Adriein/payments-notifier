import { currentUser, requireAuth } from '../../middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../Application/CommandBus/CommandBus';

const router: Router = express.Router();
const commandBus = new CommandBus();

router.get(
  '/user-chart',
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

router.get(
  '/money-chart',
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

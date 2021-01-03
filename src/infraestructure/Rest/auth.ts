import { requireAuth } from '../../middlewares/auth';
import express, { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CommandBus } from '../../application/CommandBus/CommandBus';
import { RegisterCommand } from '../../domain/commands/Auth/RegisterCommand';
import { ReadUserCommand } from '../../domain/commands/User/ReadUserCommand';
import { User } from '../../domain/entities/User.entity';
import { SignInCommand } from '../../domain/commands/Auth/SignInCommand';

const router: Router = express.Router();
const commandBus = new CommandBus();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await commandBus.execute(
        new RegisterCommand(
          req.body.username,
          req.body.email,
          req.body.password
        )
      );

      const user = (await commandBus.execute(
        new ReadUserCommand(req.body.email)
      )) as User;
        
      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.getId(),
          username: user.getName(),
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send(user.serialize());
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      await commandBus.execute(new SignInCommand(email, password));

      const user = (await commandBus.execute(
        new ReadUserCommand(email)
      )) as User;

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.getId(),
          username: user.getName(),
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      res.status(200).send(user.serialize());
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signout',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Signout the user
      req.session = null;
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export { router as auth };

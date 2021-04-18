import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { ReadUserCommand } from '../../../../Domain/Commands/User/ReadUserCommand';
import { Controller } from '../../Decorators/controller';
import jwt from 'jsonwebtoken';
import { User } from '../../../../Domain/Entities/User.entity';
import { post } from '../../Decorators/routes';
import { RegisterCommand } from '../../../../Domain/Commands/Auth/RegisterCommand';

@Controller()
export class RegisterController {
  @post('/register')
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
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
          id: user.id(),
          username: user.name(),
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
}

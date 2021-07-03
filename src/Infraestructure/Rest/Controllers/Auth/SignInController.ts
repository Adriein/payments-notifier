import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { SignInCommand } from '../../../../Domain/Commands/Auth/SignInCommand';
import { ReadUserCommand } from '../../../../Domain/Commands/User/ReadUserCommand';
import { Controller } from '../../Decorators/controller';
import jwt from 'jsonwebtoken';
import { User } from '../../../../Domain/Entities/User.entity';
import { post } from '../../Decorators/routes';

@Controller()
export class SignInController {
  @post('/signin')
  public async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const commandBus = new CommandBus();
      const { email, password } = req.body;

      await commandBus.execute(new SignInCommand(email, password));

      const user = (await commandBus.execute(
        new ReadUserCommand(email)
      )) as User;

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id(),
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
}

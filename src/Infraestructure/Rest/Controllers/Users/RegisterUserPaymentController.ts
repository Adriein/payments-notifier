import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { RegisterUserPaymentCommand } from '../../../../Domain/Commands/User/RegisterUserPaymentCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class CreateUserController {
  @post('/users/subscription/payment')
  @use(requireAuth)
  @use(currentUser)
  public async registerUserPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(new RegisterUserPaymentCommand(req.body.email));

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

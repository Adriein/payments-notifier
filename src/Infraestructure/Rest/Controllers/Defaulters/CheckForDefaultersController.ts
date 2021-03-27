import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CheckForDefaultersCommand } from '../../../../Domain/Commands/Defaulters/CheckForDefaultersCommand';
import { Controller } from '../../Decorators/controller';
import { get } from '../../Decorators/routes';

@Controller()
export class CheckForDefaultersController {
  @get('/defaulters')
  public async checkForDefaulters(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(new CheckForDefaultersCommand());

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

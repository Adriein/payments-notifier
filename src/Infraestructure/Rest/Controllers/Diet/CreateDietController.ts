import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreateDietCommand } from '../../../../Domain/Commands/Diet/CreateDietCommand';
import { requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class CreateDietController {
  @post('/diet')
  @use(requireAuth)
  public async createDiet(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new CreateDietCommand(
          req.body.userId,
          req.body.name,
          req.body.kcal
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

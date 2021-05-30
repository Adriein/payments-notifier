import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { UpdateDietCommand } from '../../../../Domain/Commands/Diet/UpdateDietCommand';
import { requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { put } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class UpdateDietController {
  @put('/diet')
  @use(requireAuth)
  public async createDiet(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new UpdateDietCommand(
          req.body.dietId,
          req.body.userId,
          req.body.name,
          req.body.kcal,
          req.body.meals
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreateUserNutritionCommand } from '../../../../Domain/Commands/Nutrition/CreateUserNutritionCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class CreateUserNutritionController {
  @post('/nutrition')
  @use(requireAuth)
  @use(currentUser)
  public async createUserNutrition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new CreateUserNutritionCommand(
          req.body.weight,
          req.body.height,
          req.body.objective,
          req.body.age,
          req.body.activity,
          req.body.gender,
          req.currentUser!.id
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

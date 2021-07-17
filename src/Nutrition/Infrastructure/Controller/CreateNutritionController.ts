import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../Infraestructure/Rest/Decorators/controller';
import { post } from '../../../Infraestructure/Rest/Decorators/routes';
import { use } from '../../../Infraestructure/Rest/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { CommandBus } from '../../../Shared/Infrastructure/Bus/CommandBus';
import { CreateNutritionHandler } from '../../Application/CreateNutritionHandler';
import { CreateNutritionCommand } from '../../Domain/Commands/CreateNutritionCommand';
import { NutritionRepository } from '../Data/NutritionRepository';

@Controller()
export class GetDietsController {
  @post('/nutrition')
  @use(requireAuth)
  @use(currentUser)
  public async createNutrition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();

      commandBus.bind(
        CreateNutritionCommand.name,
        new CreateNutritionHandler(new NutritionRepository())
      );

      await commandBus.execute(
        new CreateNutritionCommand(
          req.body.userId,
          req.body.weight,
          req.body.height,
          req.body.age,
          req.body.gender
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}

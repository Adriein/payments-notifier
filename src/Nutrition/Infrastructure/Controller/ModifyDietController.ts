import { BaseController } from '../../../Shared/Infrastructure/BaseController';
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../Infraestructure/Rest/Decorators/controller';
import { put } from '../../../Infraestructure/Rest/Decorators/routes';
import { use } from '../../../Infraestructure/Rest/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { ModifyDietCommand } from '../../Domain/Commands/ModifyDietCommand';
import { ModifyDietHandler } from '../../Application/ModifyDietHandler';
import { CreateMealCommand } from '../../Domain/Commands/CreateMealCommand';

@Controller()
export class ModifyDietController extends BaseController<void> {
  @put('/diet')
  @use(requireAuth)
  @use(currentUser)
  public async createNutrition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      this.commandBus.bind(
        ModifyDietCommand,
        this.factory.create(ModifyDietHandler)
      );

      const meals = req.body.meals.map(
        (meal: any) => new CreateMealCommand(meal.name, meal.foods)
      );

      await this.commandBus.dispatch(
        new ModifyDietCommand(req.body.nutritionId, req.body.dietId, meals)
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}

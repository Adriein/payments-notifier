import { Request, Response, NextFunction } from 'express';
import { QueryBus } from '../../../Shared/Infrastructure/Bus/QueryBus';
import { Controller } from '../../../Infraestructure/Rest/Decorators/controller';
import { get } from '../../../Infraestructure/Rest/Decorators/routes';
import { use } from '../../../Infraestructure/Rest/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { Diet } from '../../Domain/Diet.entity';
import { GetDietsQuery } from '../../Domain/Commands/GetDietsQuery';
import { GetDietsHandler } from '../../Application/GetDietsHandler';
import { NutritionRepository } from '../Data/NutritionRepository';

@Controller()
export class GetDietsController {
  @get('/diets')
  @use(requireAuth)
  @use(currentUser)
  public async getDiets(req: Request, res: Response, next: NextFunction) {
    try {
      const queryBus = new QueryBus<Diet[]>();

      queryBus.bind(
        GetDietsQuery.name,
        new GetDietsHandler(new NutritionRepository())
      );

      await queryBus.dispatch(new GetDietsQuery(req.body.userId));

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}

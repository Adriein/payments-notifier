import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { get } from '../../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';
import { currentUser, requireAuth } from '../../../../Shared/Infrastructure/Middlewares/auth';
import { GetDietsQuery } from '../../Domain/Query/GetDietsQuery';
import { BaseController } from '../../../../Shared/Infrastructure/BaseController';
import { DietResponse } from "../../Application/Find/DietResponse";

@Controller()
export class GetDietsController extends BaseController<DietResponse[]> {
  @get('/diets')
  @use(requireAuth)
  @use(currentUser)
  public async getDiets(req: Request, res: Response<DietResponse[]>, next: NextFunction) {
    try {
      const diets = await this.queryBus.ask(new GetDietsQuery(req.body.nutritionId));

      res.status(200).send(diets);
    } catch (error) {
      next(error);
    }
  }
}

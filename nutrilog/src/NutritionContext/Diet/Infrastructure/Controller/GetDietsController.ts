import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { get } from '../../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';
import { currentUser, requireAuth } from '../../../../Shared/Infrastructure/Middlewares/auth';
import { Diet } from '../../Domain/Diet.entity';
import { GetDietsQuery } from '../../Domain/Query/GetDietsQuery';
import { BaseController } from '../../../../Shared/Infrastructure/BaseController';

@Controller()
export class GetDietsController extends BaseController<Diet[]> {
  @get('/diets')
  @use(requireAuth)
  @use(currentUser)
  public async getDiets(req: Request, res: Response, next: NextFunction) {
    try {
      await this.queryBus.ask(new GetDietsQuery(req.body.userId));

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}

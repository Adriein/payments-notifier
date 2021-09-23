import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../Infraestructure/Rest/Decorators/controller';
import { get } from '../../../Infraestructure/Rest/Decorators/routes';
import { use } from '../../../Infraestructure/Rest/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { Diet } from '../../Domain/Diet.entity';
import { GetDietsQuery } from '../../Domain/Query/GetDietsQuery';
import { BaseController } from '../../../Shared/Infrastructure/BaseController';

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

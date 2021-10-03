import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../Shared/Infrastructure/Decorators/controller';
import { get } from '../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../Shared/Infrastructure/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { BaseController } from '../../../Shared/Infrastructure/BaseController';
import { Food } from '../../Domain/Food.entity';
import { SearchFoodQuery } from '../../Domain/Query/SearchFoodQuery';

@Controller()
export class SearchFoodController extends BaseController<Food[]> {
  @get('/food/:search')
  @use(requireAuth)
  @use(currentUser)
  public async getFood(req: Request, res: Response, next: NextFunction) {
    try {
      const foods = await this.queryBus.ask(
        new SearchFoodQuery(req.params.search, req.currentUser!.id!)
      );

      res.status(200).send(foods);
    } catch (error) {
      next(error);
    }
  }
}

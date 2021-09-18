import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../Infraestructure/Rest/Decorators/controller';
import { get } from '../../../Infraestructure/Rest/Decorators/routes';
import { use } from '../../../Infraestructure/Rest/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { BaseController } from '../../../Shared/Infrastructure/BaseController';
import { Food } from '../../Domain/Food.entity';
import { SearchFoodQuery } from '../../Domain/Query/SearchFoodQuery';
import { SearchFoodHandler } from '../../Application/SearchFoodHandler';

@Controller()
export class SearchFoodController extends BaseController<Food[]> {
  @get('/food/:search')
  @use(requireAuth)
  @use(currentUser)
  public async getFood(req: Request, res: Response, next: NextFunction) {
    try {
      this.queryBus.bind(
        SearchFoodQuery,
        this.factory.create(SearchFoodHandler)
      );

      const foods = await this.queryBus.ask(
        new SearchFoodQuery(req.params.search, req.currentUser!.id!)
      );
      
      res.status(200).send(foods);
    } catch (error) {
      next(error);
    }
  }
}

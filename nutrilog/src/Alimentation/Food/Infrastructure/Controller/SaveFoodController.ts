import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { SaveFoodCommand } from "../../Domain/Command/SaveFoodCommand";
import { NextFunction, Request, Response } from "express";

@Controller()
export class SaveFoodController extends BaseController<void> {
  @post('/food')
  @use(requireAuth)
  @use(currentUser)
  public async saveFood(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.commandBus.dispatch(
        new SaveFoodCommand(
          req.body.id,
          req.body.name,
          req.body.unit,
          req.body.qty,
          req.body.photo,
          req.body.kcal,
          req.body.nutrients,
          req.body.dateCreated,
          req.body.dateUpdated
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
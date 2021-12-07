import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { CreatePricingCommand } from "../../Domain/Command/CreatePricingCommand";
import { NextFunction, Request, Response } from "express";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";

@Controller()
export class CreatePricingController extends BaseController<void> {
  @post('/pricing')
  @use(requireAuth)
  @use(currentUser)
  public async createPricing(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.commandBus.dispatch(new CreatePricingCommand(
        req.body.name,
        req.body.duration,
        req.body.amount,
        req.currentUser!.id!
      ));
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
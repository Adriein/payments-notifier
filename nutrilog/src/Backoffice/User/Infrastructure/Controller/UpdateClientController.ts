import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { put } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { UpdateClientCommand } from "../../Application/UpdateClient/UpdateClientCommand";

@Controller()
export class UpdateClientController extends BaseController<void> {
  @put('/user')
  @use(requireAuth)
  @use(currentUser)
  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.commandBus.dispatch(
        new UpdateClientCommand(
          req.body.username,
          req.body.email,
          req.body.notifications,
          req.body.warnings,
          req.body.language,
          req.body.rol,
          req.currentUser!.id!
        )
      );

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
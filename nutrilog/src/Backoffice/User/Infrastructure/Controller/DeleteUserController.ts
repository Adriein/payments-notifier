import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { del } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { DeactivateClientCommand } from "../../Application/DeactivateClient/DeactivateClientCommand";
import { NextFunction, Request, Response } from "express";


@Controller()
export class DeleteUserController extends BaseController<void> {
  @del('/user/:id')
  @use(requireAuth)
  public async deleteUser(req: Request, res: Response<void>, next: NextFunction) {
    try {
      const command = new DeactivateClientCommand(req.params.id)

      await this.commandBus.dispatch(command);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
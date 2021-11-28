import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { UpdateUserPasswordCommand } from "../../Domain/Command/UpdateUserPasswordCommand";

export class UpdateUserPasswordController extends BaseController<void> {
  @post('/users/password')
  @use(requireAuth)
  @use(currentUser)
  public async updateUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.commandBus.dispatch(
        new UpdateUserPasswordCommand(
          req.body.currentUser!.id,
          req.body.oldPassword,
          req.body.newPassword
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
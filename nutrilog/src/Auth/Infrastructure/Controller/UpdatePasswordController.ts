import { BaseController } from "../../../Shared/Infrastructure/BaseController";
import { use } from "../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { post } from "../../../Shared/Infrastructure/Decorators/routes";
import { UpdatePasswordCommand } from "../../Domain/Command/UpdatePasswordCommand";

export class UpdatePasswordController extends BaseController<void> {
  @post('/password')
  @use(requireAuth)
  @use(currentUser)
  public async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.commandBus.dispatch(
        new UpdatePasswordCommand(
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
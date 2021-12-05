import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { NextFunction, Request, Response } from "express";
import { SendContactEmailCommand } from "../../Domain/Command/SendContactEmailCommand";

@Controller()
export class SendContactEmailController extends BaseController<void> {
  @post('/contact/email')
  public async sendContactEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.commandBus.dispatch(
        new SendContactEmailCommand(
          req.body.email,
          req.body.emailContent,
          req.body.subject
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
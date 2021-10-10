import { BaseController } from "../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../Shared/Infrastructure/Decorators/controller";
import { post } from "../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../Shared/Infrastructure/Decorators/use";
import { requireAuth } from "../../../middlewares/auth";
import { NextFunction, Request, Response } from "express";

@Controller()
export class SignOutController extends BaseController<void> {
  @post('/signout')
  @use(requireAuth)
  public async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      req.session = null;
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
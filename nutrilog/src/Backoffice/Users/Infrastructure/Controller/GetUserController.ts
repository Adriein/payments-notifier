import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { GetUserQuery } from "../../Domain/Query/GetUserQuery";
import { GetUserResponse } from "../../Application/Find/GetUserResponse";
import { User } from "../../Domain/User.entity";
import { GetUserPresenter } from "../../Application/Find/GetUserPresenter";

@Controller()
export class GetUserController extends BaseController<User> {
  @get('/user')
  @use(requireAuth)
  @use(currentUser)
  public async getUser(req: Request, res: Response<GetUserResponse>, next: NextFunction): Promise<void> {
    try {
      const user = await this.queryBus.ask(
        new GetUserQuery(req.body.id)
      );

      const presenter = new GetUserPresenter();

      res.status(200).send(presenter.execute(user));
    } catch (error) {
      next(error);
    }
  }
}
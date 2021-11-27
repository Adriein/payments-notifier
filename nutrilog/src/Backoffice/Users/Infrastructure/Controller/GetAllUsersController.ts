import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { GetUserResponseDto } from "../../Application/GetUserResponseDto";
import { GetUserResponse } from "../GetUserResponse";
import { GetUserPresenter } from "../GetUserPresenter";

@Controller()
export class GetAllUsersController extends BaseController<GetUserResponseDto[]> {
  @post('/users')
  @use(requireAuth)
  @use(currentUser)
  public async getAllUsers(req: Request, res: Response<GetUserResponse[]>, next: NextFunction) {
    try {
      const query = new GetAllUsersQuery(req.body.filters, req.currentUser!.id);

      const queryResponses: GetUserResponseDto[] = await this.queryBus.ask(query);

      const responses = queryResponses.map((queryResponse: GetUserResponseDto) => {
        const presenter = new GetUserPresenter();
        return presenter.execute(queryResponse.user)
      });

      res.status(200).send(responses);
    } catch (error) {
      next(error);
    }
  }
}

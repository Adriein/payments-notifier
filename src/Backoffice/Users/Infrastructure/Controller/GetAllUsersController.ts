import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../middlewares/auth";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { GetUserResponseDto } from "../../Application/GetUserResponseDto";
import { GetUserResponse } from "../GetUserResponse";
import { GetUserPresenter } from "../GetUserPresenter";

@Controller()
export class GetAllUsersController extends BaseController<GetUserResponseDto[]> {
  @get('/users')
  @use(requireAuth)
  @use(currentUser)
  public async getAllUsers(req: Request, res: Response<GetUserResponse[]>, next: NextFunction) {

    const criteria = new Criteria();
    try {
      const queryResponses: GetUserResponseDto[] = await this.queryBus.ask(new GetAllUsersQuery(
        criteria,
        req.currentUser!.id
      ));

      const responses = queryResponses.map((queryResponse: GetUserResponseDto) => {
        const presenter = new GetUserPresenter();
        return presenter.execute(queryResponse.user, queryResponse.pricing)
      });

      res.status(200).send(responses);
    } catch (error) {
      next(error);
    }
  }
}

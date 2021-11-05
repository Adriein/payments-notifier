import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../middlewares/auth";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { GetUserResponseDto } from "../../Application/GetUserResponseDto";
import { GetUserResponse } from "../GetUserResponse";
import { GetUserPresenter } from "../GetUserPresenter";
import { FilterRequestDto } from "../../Application/FilterRequestDto";

@Controller()
export class GetAllUsersController extends BaseController<GetUserResponseDto[]> {
  @get('/users')
  @use(requireAuth)
  @use(currentUser)
  public async getAllUsers(req: Request, res: Response<GetUserResponse[]>, next: NextFunction) {
    try {
      const filters = this.buildFilters(req.query);
      const query = new GetAllUsersQuery(filters, req.currentUser!.id);

      const queryResponses: GetUserResponseDto[] = await this.queryBus.ask(query);

      const responses = queryResponses.map((queryResponse: GetUserResponseDto) => {
        const presenter = new GetUserPresenter();
        return presenter.execute(queryResponse.user, queryResponse.pricing)
      });

      res.status(200).send(responses);
    } catch (error) {
      next(error);
    }
  }

  private buildFilters(a: any): FilterRequestDto[] {
    return [];
  }
}

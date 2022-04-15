import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { FindTenantClientsQuery } from "../../Application/FindTenantClients/FindTenantClientsQuery";
import { FindTenantClientsResponse } from "../../Application/FindTenantClients/FindTenantClientsResponse";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";

@Controller()
export class FindTenantClientsController extends BaseController<NutrilogResponse<FindTenantClientsResponse[]>> {
  @post('/users')
  @use(requireAuth)
  @use(currentUser)
  public async getAllUsers(
    req: Request,
    res: Response<NutrilogResponse<FindTenantClientsResponse[]>>,
    next: NextFunction
  ) {
    try {
      const filters = req.body.filters || [];
      const query = new FindTenantClientsQuery(filters, req.currentUser!.id, req.body.page, req.body.quantity);

      const response = await this.queryBus.ask<NutrilogResponse<FindTenantClientsResponse[]>>(query);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

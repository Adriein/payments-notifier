import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { User } from '../../../../Domain/Entities/User.entity';
import { get } from '../../../../Shared/Infrastructure/Decorators/routes';
import { OPERATORS } from '../../../../Domain/constants';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { ReadCalculatedReportCommand } from '../../../../Domain/Commands/User/ReadCalculatedReportCommand';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';
import { currentUser, requireAuth } from '../../../../Shared/Infrastructure/Middlewares/auth';

@Controller()
export class CalculateReportController {
  @get('/calculatedReport')
  @use(requireAuth)
  @use(currentUser)
  public async calculateReport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      const criteria = this.getCriteria(req.query);

      if (Object.keys(req.query).length) {
        const users = (await commandBus.execute(
          new ReadCalculatedReportCommand(req.currentUser!.id, criteria)
        )) as User[];
        res.status(200).send(users.map((user) => user.serialize()));
        return;
      }

      const users = (await commandBus.execute(
        new ReadCalculatedReportCommand(req.currentUser!.id)
      )) as User[];

      res.status(200).send(users.map((user) => user.serialize()));
    } catch (error) {
      next(error);
    }
  }

  private getCriteria(query: any) {
    return Object.keys(query).reduce((acc, key) => {
      return {
        ...acc,
        [key]: { value: query[key], operation: OPERATORS.equal },
      };
    }, {});
  }
}

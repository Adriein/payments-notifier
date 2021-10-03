import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { GenerateReportCommand } from '../../../../Domain/Commands/Defaulters/GenerateReportCommand';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { get } from '../../../../Shared/Infrastructure/Decorators/routes';

@Controller()
export class GenerateDefaultersReportController {
  @get('/report')
  public async generateDefaultersReport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(new GenerateReportCommand());

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

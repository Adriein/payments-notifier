import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { ContactEmailCommand } from '../../../../Domain/Commands/Backoffice/ContactEmailCommand';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';

@Controller()
export class ContactEmailController {
  @post('/contact-email')
  public async getContactEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new ContactEmailCommand(
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

import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { post } from '../../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';
import { requireAuth } from '../../../../middlewares/auth';

@Controller()
export class SignOutController {
  @post('/signout')
  @use(requireAuth)
  public async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      // Signout the user
      req.session = null;
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

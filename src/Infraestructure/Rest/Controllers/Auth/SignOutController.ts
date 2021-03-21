import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';
import { use } from '../../Decorators/use';
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

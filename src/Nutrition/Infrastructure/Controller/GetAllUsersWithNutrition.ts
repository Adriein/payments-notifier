// import { Request, Response, NextFunction } from 'express';
// import { User } from '../../../Domain/Entities/User.entity';
// import { Controller } from '../../../Infraestructure/Rest/Decorators/controller';
// import { get } from '../../../Infraestructure/Rest/Decorators/routes';
// import { use } from '../../../Infraestructure/Rest/Decorators/use';
// import { currentUser, requireAuth } from '../../../middlewares/auth';
// import { BaseController } from '../../../Shared/Infrastructure/BaseController';
// import { GetUserHandler } from '../../../Users/Application/GetUserHandler';
// import { GetUserQuery } from '../../../Users/Domain/Query/GetUserQuery';
// import { Nutrition } from '../../Domain/Nutrition.entity';

// @Controller()
// export class GetAllUsersWithNutritionController extends BaseController<any> {
//   @get('/nutrition/users')
//   @use(requireAuth)
//   @use(currentUser)
//   public async createNutrition(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       this.queryBus.bind(
//         GetAllNutritionCommand,
//         this.factory.create(GetAllNutritionHandler)
//       );

//       this.queryBus.bind(GetUserQuery, this.factory.create(GetUserHandler));

//       const nutritions: Nutrition[] = await this.queryBus.dispatch(
//         new GetAllNutritionCommand()
//       );

//       for (const nutrition of nutritions) {
//         const user: User = await this.queryBus.dispatch(
//           new GetUserQuery(nutrition.userId())
//         );
//       }

//       res.status(200).send({});
//     } catch (error) {
//       next(error);
//     }
//   }
// }

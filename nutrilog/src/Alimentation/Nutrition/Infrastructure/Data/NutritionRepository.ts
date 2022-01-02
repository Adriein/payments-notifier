import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { NutritionMapper } from './NutritionMapper';
import { Either } from "../../../../Shared/Domain/types";
import { NutritionNotExistsError } from "../../Domain/NutritionNotExistsError";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { Right } from "../../../../Shared/Domain/Entities/Right";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

export class NutritionRepository implements INutritionRepository {
  private prisma = Database.instance().connection();
  private mapper = new NutritionMapper();

  delete(entity: Nutrition): Promise<void> {
    return Promise.resolve(undefined);
  }

  @Log(process.env.LOG_LEVEL)
  public async find(criteria: any): Promise<Either<Error, Nutrition[]>> {
    try {
      const results = await this.prisma.nutrition.findMany({
        where: {
          admin_id: ''
        }
      });

      this.prisma.$disconnect();

      if (results.length === 0) {
        return Left.error(new NutritionNotExistsError(`Admin with id: a not has any nutrition`));
      }

      return Right.success(results.map((result: any) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findByUserId(userId: string): Promise<Either<Error | NutritionNotExistsError, Nutrition>> {
    try {
      const result = await this.prisma.nutrition.findUnique({
        where: {
          id: userId
        }
      });

      this.prisma.$disconnect();

      if (!result) {
        return Left.error(new NutritionNotExistsError(`User with id: ${userId} not has nutrition`));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findOne(id: string): Promise<Either<Error, Nutrition>> {
    try {
      const result = await this.prisma.nutrition.findUnique({
        where: {
          id
        }
      });

      this.prisma.$disconnect();

      if (!result) {
        return Left.error(new NutritionNotExistsError(`Nutrition with id: ${id} not found`));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: Nutrition): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);

      await this.prisma.nutrition.create({ data });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  update(entity: Nutrition): Promise<void> {
    return Promise.resolve(undefined);
  }

}

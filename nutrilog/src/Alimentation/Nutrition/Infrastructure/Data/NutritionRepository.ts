import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { NutritionMapper } from './NutritionMapper';
import { Either } from "../../../../Shared/Domain/types";
import { NutritionNotExistsError } from "../../Domain/NutritionNotExistsError";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { Right } from "../../../../Shared/Domain/Entities/Right";
import Database from "../../../../Shared/Infrastructure/Data/Database";

export class NutritionRepository implements INutritionRepository {
  private prisma = Database.instance().connection();
  private mapper = new NutritionMapper();

  delete(entity: Nutrition): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(adminId: string): Promise<Either<Error, Nutrition[]>> {
    try {
      const results = await this.prisma.nutrition.findMany({
        where: {
          admin_id: adminId
        }
      });

      this.prisma.$disconnect();

      if (results.length === 0) {
        return Left.error(new NutritionNotExistsError(`Admin with id: ${adminId} not has any nutrition`));
      }

      return Right.success(results.map((result: any) => this.mapper.toDomain(result)));
    } catch (error) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  public async findByUserId(id: string): Promise<Either<Error | NutritionNotExistsError, Nutrition>> {
    try {
      const result = await this.prisma.nutrition.findUnique({
        where: {
          id
        }
      });

      this.prisma.$disconnect();

      if (!result) {
        return Left.error(new NutritionNotExistsError(`User with id: ${id} not has nutrition`));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  findOne(id: string): Promise<Either<Error, Nutrition>> {
    throw new Error('not implemented');
  }

  public async save(entity: Nutrition): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);
      
      await this.prisma.nutrition.create({ data });

      this.prisma.$disconnect();
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  update(entity: Nutrition): Promise<void> {
    return Promise.resolve(undefined);
  }

}

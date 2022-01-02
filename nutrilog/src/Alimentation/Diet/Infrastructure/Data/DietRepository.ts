import { Diet } from '../../Domain/Diet.entity';
import { IDietRepository } from '../../Domain/IDietRepository';
import { DietMapper } from './DietMapper';
import { Either } from "../../../../Shared/Domain/types";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { DietNotExistsError } from "../../Domain/DietNotExistsError";
import { Prisma } from "@prisma/client";
import { Right } from "../../../../Shared/Domain/Entities/Right";

export class DietRepository implements IDietRepository {
  private prisma = Database.instance().connection();
  private mapper = new DietMapper();

  @Log(process.env.LOG_LEVEL)
  public async save(entity: Diet): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);

      await this.prisma.diet.create({ data });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  public async update(entity: Diet): Promise<void> {

  }

  public async delete(entity: Diet): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findAll(nutritionId: string): Promise<Diet[]> {
    throw new Error();
  }

  public async getLastDiet(): Promise<Diet | undefined> {
    throw new Error('Method not implemented.');
  }

  @Log(process.env.LOG_LEVEL)
  public async find(nutritionId: any): Promise<Either<Error, Diet[]>> {
    try {
      const results = await this.prisma.diet.findMany({
        where: {
          nutrition_id: nutritionId
        }
      });

      this.prisma.$disconnect();

      if (results.length === 0) {
        Left.error(new DietNotExistsError(`This nutrition id: ${nutritionId} hasn't associated diets`));
      }

      return Right.success(results.map((result: Prisma.dietWhereInput) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  findOne(id: string): Promise<Either<Error, Diet>> {
    throw new Error('Method not implemented.');
  }
}

import { Nutrition } from "../../Domain/Nutrition.entity";
import { GetUserResponse } from "../../../../Backoffice/Users/Application/Find/GetUserResponse";
import { GetNutritionResponse } from "../Find/GetNutritionResponse";

export class NutritionResponseBuilder {
  public run(nutrition: Nutrition, user: GetUserResponse): GetNutritionResponse {
    return {
      user: {
        id: user.id,
        name: user.username,
        active: user.active,
        subscriptionActive: user.defaulter
      },
      age: nutrition.age(),
      gender: nutrition.gender(),
      height: nutrition.height(),
      weight: nutrition.weight(),
      createdAt: nutrition.createdAt(),
      updatedAt: nutrition.updatedAt()
    }
  }
}
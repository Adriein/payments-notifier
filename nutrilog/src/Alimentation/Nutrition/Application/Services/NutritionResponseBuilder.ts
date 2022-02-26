import { Nutrition } from "../../Domain/Nutrition.entity";
import { GetNutritionResponse } from "../Find/GetNutritionResponse";
import { GetClientProfileResponse } from "../../../../Backoffice/User/Application/GetClientProfile/GetClientProfileResponse";

export class NutritionResponseBuilder {
  public run(nutrition: Nutrition, user: GetClientProfileResponse): GetNutritionResponse {
    return {
      user: {
        id: user.id,
        name: user.username,
        active: user.active,
        defaulter: false
      },
      age: nutrition.age(),
      gender: nutrition.gender(),
      height: nutrition.height(),
      weight: nutrition.weight(),
      maintenanceKcal: nutrition.maintenanceKcal(),
      createdAt: nutrition.createdAt(),
      updatedAt: nutrition.updatedAt()
    }
  }
}
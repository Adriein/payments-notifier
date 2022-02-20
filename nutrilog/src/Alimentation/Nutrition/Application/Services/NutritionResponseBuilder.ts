import { Nutrition } from "../../Domain/Nutrition.entity";
import { FindTenantClientsResponse } from "../../../../Backoffice/User/Application/FindTenantClients/FindTenantClientsResponse";
import { GetNutritionResponse } from "../Find/GetNutritionResponse";

export class NutritionResponseBuilder {
  public run(nutrition: Nutrition, user: FindTenantClientsResponse): GetNutritionResponse {
    return {
      user: {
        id: user.id,
        name: user.username,
        active: user.active,
        defaulter: user.defaulter
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
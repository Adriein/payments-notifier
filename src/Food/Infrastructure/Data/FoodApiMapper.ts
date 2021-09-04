import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { Food } from "../../Domain/Food.entity";
import { MicroNutrients } from "../../Domain/MicroNutrients.entity";
import { Nutrient, SpoonacularApiIngredientInformationResponse } from "./SpoonacularApiIngredientInformation.response.api";

export class FoodApiMapper implements IMapper<Food, SpoonacularApiIngredientInformationResponse> {
    datamodel(domain: Food): SpoonacularApiIngredientInformationResponse {
        throw new Error("Method not implemented.");
    }
    domain(datamodel: SpoonacularApiIngredientInformationResponse): Food {
        const micro = datamodel.nutrition.nutrients.map(({ name, amount, unit}: Nutrient) => {
            return new MicroNutrients(name, amount, unit);
        });
        
        return Food.build(datamodel.name, datamodel.unit, micro);
    }
}
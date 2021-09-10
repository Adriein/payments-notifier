export interface Photo {
  thumb: string;
}

export interface FoodSearch {
  food_name: string;
  serving_unit: string;
  tag_name: string;
  serving_qty: number;
  common_type?: any;
  tag_id: number;
  photo: Photo;
  locale: string;
}

export interface NutritionixApiSearchResponse {
  headers: any;
  data: FoodSearch;
}

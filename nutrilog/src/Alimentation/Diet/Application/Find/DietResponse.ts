export type DietResponse = {
  id: string;
  name: string;
  kcal: number;
  objective: string;
  nutritionId: string;
  active: boolean;
  meals: MealsResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export type MealsResponse = {
  id: string;
  name: string;
  dietId: string;
  foods: any[];
  createdAt: Date;
  updatedAt: Date;
}
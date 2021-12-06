export type GetNutritionResponse = {
  user: {
    id: string;
    name: string;
    active: boolean;
    subscriptionActive: boolean;
  };
  weight: number;
  height: number;
  age: number;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}
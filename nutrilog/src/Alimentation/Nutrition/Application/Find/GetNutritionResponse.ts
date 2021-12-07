export type GetNutritionResponse = {
  user: {
    id: string;
    name: string;
    active: boolean;
    defaulter: boolean;
  };
  weight: number;
  height: number;
  age: number;
  gender: string;
  maintenanceKcal: number;
  createdAt: Date;
  updatedAt: Date;
}
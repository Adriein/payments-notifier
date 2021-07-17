import { IHandler } from '../../Domain/Interfaces';

export type PricingObject = {
  [key: string]: { duration: number; price: number };
};

export type CriteriaObject = {
  [key: string]: { value: string; operation: string };
};

export type Counter = { [key: string]: number };

export type NutritionPlan = {
  bulk: 'bulk';
  cut: 'cut';
  mantinence: 'mantinence';
};

export type GenderType = {
  male: 'male';
  female: 'female';
};

export type KcalFormula = {
  weight: number;
  height: number;
  age: number;
};

export type BindCommandHandler<T> = {
  [key: string]: T;
};

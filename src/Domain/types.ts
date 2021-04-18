export type PricingObject = {
  [key: string]: { duration: number; price: number };
};

export type CriteriaObject = {
  [key: string]: { value: string; operation: string; };
};

export type Counter = { [key: string]: number };

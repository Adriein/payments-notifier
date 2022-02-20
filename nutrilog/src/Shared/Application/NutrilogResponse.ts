import { Metadata } from "./Metadata";

export class NutrilogResponse<T, M extends Metadata = any> {
  constructor(public data: T, public metadata?: M) {}
}
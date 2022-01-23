export class NutrilogResponse<T, M> {
  constructor(public data: T, public metadata?: M) {}
}
export interface IMapper<T, M> {
  toSaveDataModel(domain: T): M;

  toUpdateDataModel(domain: T): M;

  toDomain<C>(dataModel: C): T;
}

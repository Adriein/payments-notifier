export interface IMapper<T, C> {
  toDataModel(domain: T): C;

  toDomain(dataModel: C): T;
}

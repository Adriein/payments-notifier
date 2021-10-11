export interface IMapper<T, C> {
  toDataModel(domain: T): C;

  toDomain(datamodel: C): T;
}

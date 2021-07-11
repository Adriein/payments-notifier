export interface IMapper<T, C> {
  datamodel(domain: T): C;
  domain(datamodel: C): T;
}

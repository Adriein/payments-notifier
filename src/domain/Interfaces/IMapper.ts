export interface IMapper<T> {
  domain(datamodel: any): T;
  datamodel(domain: T): any;
}

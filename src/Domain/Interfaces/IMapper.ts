export interface IMapper<T> {
  domain(...datamodels: any[]): T;
  datamodel(domain: T): any;
}

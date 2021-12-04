export interface IEmailMapper<D, M> {
  toDataModel(domain: D): M;

  toDomain(dataModel: M): D;
}
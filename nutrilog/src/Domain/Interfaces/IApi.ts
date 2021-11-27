export interface IApi {
  get(url: string, params: any): Promise<any>;
}

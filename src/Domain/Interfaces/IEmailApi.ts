export interface IEmailApi {
  getDynamicTemplateId(name: string): Promise<any>;
}

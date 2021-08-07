export interface ITranslator {
  translate(field: string, equality: string, operator: string): string;
}

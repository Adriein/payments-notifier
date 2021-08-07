import { ITranslator } from '../Interfaces/ITraducer';

export class SqlTranslator implements ITranslator {
  public translate(field: string, equality: string, operator: string): string {
    return `WHERE ${field} ${operator} ${equality}`;
  }
}

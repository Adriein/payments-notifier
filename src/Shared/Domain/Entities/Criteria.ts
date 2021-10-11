import { OPERATORS } from '../../../Domain/constants';
import { ITranslator } from '../Interfaces/ITranslator';

export class Criteria {
  private _field!: string;
  private _equality!: string;
  private _operation!: OPERATORS;

  constructor(private translator: ITranslator) {
  }

  public field(field: string): this {
    this._field = field;
    return this;
  }

  public equals(equality: string): this {
    this._operation = OPERATORS.equal;
    this._equality = equality;
    return this;
  }

  public toQuery(prefix?: string): string {
    return this.translator.translate(
      `${prefix}_${this._field}`,
      this._equality,
      this._operation
    );
  }
}

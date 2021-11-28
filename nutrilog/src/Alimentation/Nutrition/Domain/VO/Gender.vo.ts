import { ValueObject } from '../../../../Shared/Domain/VO/ValueObject';

export class Gender extends ValueObject {
  private _value: string;

  constructor(value: string) {
    super();
    if (!this.validate(value)) {
      throw new Error();
    }

    this._value = value;
  }

  protected validate(primitive: string): boolean {
    return (
      typeof primitive === 'string' &&
      (primitive === 'male' || primitive === 'female')
    );
  }

  get value(): string {
    return this._value;
  }
}

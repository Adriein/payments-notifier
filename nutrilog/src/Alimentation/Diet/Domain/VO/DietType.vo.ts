import { ValueObject } from '../../../../Shared/Domain/VO/ValueObject';

export class DietType extends ValueObject {
  private readonly _value: string;

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
      (primitive === 'maintenance' ||
        primitive === 'cut' ||
        primitive === 'bulk')
    );
  }

  get value(): string {
    return this._value;
  }
}

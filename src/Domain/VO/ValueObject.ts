export abstract class ValueObject {
  protected abstract validate(primitive: string | boolean | number | Date): boolean;

  abstract get value(): string | boolean | number | Date;
}

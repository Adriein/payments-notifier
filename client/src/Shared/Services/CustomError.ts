export class CustomError extends Error {
  public constructor(
    public readonly statusCode: number,
    public readonly errorMsg: string[],
    public readonly key: string
  ) {
    super('Custom Error');

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
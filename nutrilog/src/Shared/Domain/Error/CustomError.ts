export abstract class CustomError extends Error {
  abstract statusCode: number;

  protected constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serialize(): { message: string; key: string; }[];
}
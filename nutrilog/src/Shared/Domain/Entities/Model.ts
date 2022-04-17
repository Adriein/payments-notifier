import { Attributes } from "./Attributes";

export abstract class Model<T> {
  protected constructor(private readonly attributes: Attributes<T>) {}

  public get: <K extends keyof T>(key: K) => T[K] = this.attributes.get;
  public getAll: () => T = this.attributes.getAll;

  public set(update: Partial<T>): void {
    this.attributes.set(update);
  }

  public abstract pagination(): any;

  public abstract orderBy(): any;

}
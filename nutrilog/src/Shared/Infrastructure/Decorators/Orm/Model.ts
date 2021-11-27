import { TABLE_NAME_METADATA } from "../../../Domain/constants";
import { ConstructorFunc } from "../../../Domain/types";

export function Model(name: string) {
  return function (constructor: ConstructorFunc) {
    Reflect.defineMetadata(TABLE_NAME_METADATA, name, constructor);
  }
}
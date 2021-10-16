import { TABLE_NAME_METADATA } from "../../../Domain/constants";

export function Model(name: string) {
  return function (target: object) {
    Reflect.defineMetadata(TABLE_NAME_METADATA, name, target);
  }
}
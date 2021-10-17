import { TABLE_FIELD_METADATA } from "../../../Domain/constants";

export function Column() {
  return function (target: Object, propName: string) {
    const storedMetadata = Reflect.getMetadata(TABLE_FIELD_METADATA, target);

    if (storedMetadata?.length) {
      Reflect.defineMetadata(TABLE_FIELD_METADATA, [ ...storedMetadata, propName ], target);
      return;
    }

    Reflect.defineMetadata(TABLE_FIELD_METADATA, [ propName ], target);
  };
}

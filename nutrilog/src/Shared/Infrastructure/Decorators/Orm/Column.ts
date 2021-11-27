import { TABLE_FIELD_METADATA } from "../../../Domain/constants";
import { ColumnMetadata } from "../../../Domain/types";

export function Column() {
  return function (target: Object, propName: string) {
    const storedMetadata = Reflect.getMetadata(TABLE_FIELD_METADATA, target);
    const metadata: ColumnMetadata = { type: '', name: propName }

    if (storedMetadata?.length) {
      Reflect.defineMetadata(TABLE_FIELD_METADATA, [ ...storedMetadata, metadata ], target);
      return;
    }

    Reflect.defineMetadata(TABLE_FIELD_METADATA, [ metadata ], target);
  };
}

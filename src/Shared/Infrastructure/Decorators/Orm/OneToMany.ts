import { TABLE_RELATION_METADATA } from "../../../Domain/constants";
import { ConstructorFunc } from "../../../Domain/types";

export function OneToMany(refTable: string, refPropName: string, constructor: ConstructorFunc) {
  return function (target: Object, propName: string) {
    const storedMetadata = Reflect.getMetadata(TABLE_RELATION_METADATA, target);
    const metaData = { prop: propName, refTable, refPropName, dao: constructor };

    if (storedMetadata?.length) {
      Reflect.defineMetadata(TABLE_RELATION_METADATA, [ ...storedMetadata, metaData ], target);
      return;
    }

    Reflect.defineMetadata(TABLE_RELATION_METADATA, [ metaData ], target);
  }
}

